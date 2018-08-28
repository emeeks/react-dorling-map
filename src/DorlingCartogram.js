import React from 'react';
import { feature, neighbors, mesh } from 'topojson-client';
import worldData from './geodata/world';
import countryName from './geodata/country_names';
import isoCode from './geodata/iso_codes';
import { geoPath, geoMercator } from 'd3-geo';
import { toCircle, fromCircle } from 'flubber';
import { interpolateHsl, interpolateNumber } from "d3-interpolate"
import { scaleLinear } from 'd3-scale';
import TweenMax from 'gsap/TweenMax';
import {
  forceSimulation,
  forceLink,
  forceX,
  forceY,
  forceCollide
} from 'd3-force';
import memoize from 'memoize-one';
const tweenableColors = {"fill": true, "stroke": true}

const interpolateStyles = (previousStyle, nextStyle) => {
  const pKeys = Object.keys(previousStyle)
  const nKeys = Object.keys(nextStyle)
  const styleKeys = [...pKeys, nKeys].reduce((p,c) => p.indexOf(c) !== -1 ? p : [...p,c], [])
  const styleInterpolators = {}

  styleKeys.forEach(styleKey => {
    if (tweenableColors[styleKey]) {
      styleInterpolators[styleKey] = interpolateHsl(previousStyle[styleKey] || "white", nextStyle[styleKey] || "white")
    }
    else {
      styleInterpolators[styleKey] = interpolateNumber(previousStyle[styleKey] || 0, nextStyle[styleKey] || 0)
    }
  })
  return styleInterpolators
}

const generateCirclePath = (cx, cy, r) =>
  `${[
    'M',
    cx - r,
    cy,
    'a',
    r,
    r,
    0,
    1,
    0,
    r * 2,
    0,
    'a',
    r,
    r,
    0,
    1,
    0,
    -(r * 2),
    0
  ].join(' ')}Z`;

const sizeByWrapper = sizeBy =>
  (typeof sizeBy === 'function' ? sizeBy : d => d[sizeBy]);

class DorlingCartogram extends React.Component {
  constructor(props) {
    const {
      size,
      sizeBy = () => 5,
      geoStyle = () => ({ fill: 'gold', stroke: 'black' }),
      circleStyle = geoStyle || (() => ({ fill: 'gold', stroke: 'black' })),
      projectionType = geoMercator
    } = props;

    // //PREP WORK IN CONSTRUCTOR MOVE OUT FOR RESPONSIVE COMPONENT
    const longestSubArc = (p, c) => Math.max(p, c.length);

    worldData.objects.countries.geometries.forEach((geom) => {
      if (geom.type === 'MultiPolygon') {
        geom.arcs = geom.arcs.sort((a, b) => b.reduce(longestSubArc, 0) - a.reduce(longestSubArc, 0));
      }
    });

    const features = feature(worldData, worldData.objects.countries).features;
    const featureMesh = mesh(worldData, worldData.objects.countries);
    const countryNeighbors = neighbors(worldData.objects.countries.geometries);

    const projection = projectionType().fitExtent([[0, 0], size], featureMesh);
    const pathGenerator = geoPath().projection(projection);

    const featureEdges = [];

    features.forEach((d, i) => {
      d.label = countryName[d.id];
      d.iso2 = isoCode[countryName[d.id]];
      d.neighbors = countryNeighbors[i].map(p => features[p]);
      d.neighbors.forEach((target) => {
        featureEdges.push({ source: d, target });
      });
      d.centroid = pathGenerator.centroid(d);
      d.geoPath = pathGenerator(d);
      d.x = d.centroid[0];
      d.y = d.centroid[1];
    });

    super(props);
    this.state = {
      hoverAnnotation: 0,
      features,
      featureEdges,
      geoStyleFn: typeof geoStyle === 'function' ? geoStyle : () => geoStyle,
      circleStyleFn:
        typeof circleStyle === 'function' ? circleStyle : () => circleStyle
    };
  }

  forceSimulateCartogram = memoize((sizeBy = () => 5, data) => {
    const { features, featureEdges, geoStyleFn, circleStyleFn } = this.state;
    const { size } = this.props;
    

    const mappedFeatures = features.map((d, i) => {
      const correspondingDataFeature = data.find(p => p.id === d.iso2);
      const datum = {
        ...d,
        ...correspondingDataFeature
      };

      datum.r = sizeByWrapper(sizeBy)(datum, i);
      return datum;
    });

    const linkForce = forceLink()
      .strength(1)
      .links(featureEdges);

    const circleCollide = forceCollide().radius(d => d.r);
    const dorlingSimulation = forceSimulation()
      .force('link', linkForce)
      .force('x', forceX(d => d.centroid[0]).strength(1))
      .force('y', forceY(d => d.centroid[1]).strength(1))
      .force('collide', circleCollide)
      .nodes(mappedFeatures);

    for (let i = 0; i < 500; ++i) dorlingSimulation.tick();

    const minX = mappedFeatures.reduce(
      (p, c) => Math.min(p, c.x - c.r),
      Infinity
    );
    const minY = mappedFeatures.reduce(
      (p, c) => Math.min(p, c.y - c.r),
      Infinity
    );
    const maxX = mappedFeatures.reduce(
      (p, c) => Math.max(p, c.x + c.r),
      -Infinity
    );
    const maxY = mappedFeatures.reduce(
      (p, c) => Math.max(p, c.y + c.r),
      -Infinity
    );

    const xDifference = (minX + (size[0] - maxX)) / size[0];
    const yDifference = (minY + (size[1] - maxY)) / size[1];

    const changeRate = Math.min(xDifference, yDifference);
    const changeScale = scaleLinear()
      .domain(xDifference < yDifference ? [minX, maxX] : [minY, maxY])
      .range(xDifference < yDifference ? [0, size[0]] : [0, size[1]]);

    
    mappedFeatures.forEach((d, i) => {
      const circleStyleD = circleStyleFn(d)
      const geoStyleD = geoStyleFn(d)

      d.x = changeScale(d.x);
      d.y = changeScale(d.y);
      d.r += changeRate * d.r;
      d.circlePath = generateCirclePath(d.x, d.y, d.r);
      d.toCartogram = toCircle(d.geoPath, d.x, d.y, d.r);
      d.toMap = fromCircle(d.x, d.y, d.r, d.geoPath);
      d.toCartogramStyle = interpolateStyles(geoStyleD, circleStyleD)
      d.toMapStyle = interpolateStyles(circleStyleD, geoStyleD)

    });
    return mappedFeatures;
  })

  cartogramOrMap = (morphingDirection = 'toCartogram', features) => {
    const { transitionSeconds = 1 } = this.props;
    const counter = { var: 0 };
    const paths = this.svg.querySelectorAll('path');
    TweenMax.to(counter, transitionSeconds, {
      var: 100,
      fill: "green",
      onUpdate() {
        paths.forEach((path, pathI) => {
          if (counter.var === 100 && morphingDirection === 'toMap') {
            path.setAttribute('d', features[pathI].geoPath);
          } else {
            path.setAttribute(
              'd',
              features[pathI][morphingDirection](counter.var / 100)
            );
          }
          Object.keys(features[pathI][`${morphingDirection}Style`]).forEach(styleKey => {
            path.style[styleKey] = features[pathI][`${morphingDirection}Style`][styleKey](counter.var / 100)
          })
        });
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    const found = this.state.features.find((d, i) =>
      sizeByWrapper(this.props.sizeBy)(d, i) !==
        sizeByWrapper(nextProps.sizeBy)(
          d,
          i
        )
    );
    if (found) {
      return true;
    }

    if (nextProps.cartogram !== this.props.cartogram) {
      const direction = nextProps.cartogram ? 'toCartogram' : 'toMap';
      this.cartogramOrMap(
        direction,
        this.forceSimulateCartogram(nextProps.sizeBy, nextProps.data)
      );
      return false;
    }
    return true;
  }

  generateFeatures = memoize((features, sizeBy) =>
    list.filter(item => item.text.includes(filterText)))

  render() {
    const { geoStyleFn, circleStyleFn } = this.state;
    const {
      size, sizeBy, data, cartogram
    } = this.props;

    const sizedFeatures = this.forceSimulateCartogram(sizeBy, data);

    return (
      <div>
        <svg width={size[0]} height={size[1]} ref={ref => (this.svg = ref)}>
          {sizedFeatures.map(f => (
            <path
              fill="gold"
              stroke="black"
              d={cartogram ? f.circlePath : f.geoPath}
              style={cartogram ? circleStyleFn(f) : geoStyleFn(f)}
            />
          ))}
        </svg>
      </div>
    );
  }
}

export default DorlingCartogram;
