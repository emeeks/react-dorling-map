import React from "react"
import DorlingCartogram from "../src/DorlingCartogram"
import ResponsiveDorlingCartogram from "../src/ResponsiveDorlingCartogram"
import geoNaturalEarth1 from "d3-geo/src/projection/naturalEarth1"
import geodata from "./world.json"
import { pie, arc } from "d3-shape"

const secondGeoData = geodata.filter((d, i) => i < 10)

const customMark = d => {
  if ((!d.bbhouseholds && !d.watchers) || d.r < 4) {
    return <circle fill="gray" cx={d.x} cy={d.y} r={d.r} />
  }
  const pieLayout = pie()
  const piePieces = pieLayout([d.bbhouseholds, d.watchers])

  const arcGenerator = arc()
    .outerRadius(d.r - 4)
    .innerRadius(d.r > 10 ? 5 : 0)

  return (
    <g transform={`translate(${d.x},${d.y})`}>
      <circle r={d.r} fill="purple" />
      <path d={arcGenerator(piePieces[0])} fill="gold" stroke="white" />
      <path d={arcGenerator(piePieces[1])} fill="brown" stroke="white" />
    </g>
  )
}

const dynamicSize = (d, i) => (d.watchers && d.watchers / 10) || i / 20 + 1
const staticSize = d => (d.bbhouseholds && d.bbhouseholds / 10) || 0
const countryData = [
  { id: "EC", bbhouseholds: 500, watchers: 500 },
  { id: "VE", bbhouseholds: 500, watchers: 500 },
  { id: "PE", bbhouseholds: 100, watchers: 50 },
  { id: "PH", bbhouseholds: 90, watchers: 40 },
  { id: "PN", bbhouseholds: 80, watchers: 30 },
  { id: "PL", bbhouseholds: 70, watchers: 20 },
  { id: "PT", bbhouseholds: 60, watchers: 10 },
  { id: "PR", bbhouseholds: 100, watchers: 50 },
  { id: "QA", bbhouseholds: 100, watchers: 50 },
  { id: "RE", bbhouseholds: 100, watchers: 50 },
  { id: "RO", bbhouseholds: 100, watchers: 50 },
  { id: "RU", bbhouseholds: 100, watchers: 50 },
  { id: "RW", bbhouseholds: 100, watchers: 50 },
  { id: "BL", bbhouseholds: 100, watchers: 50 },
  { id: "SH", bbhouseholds: 100, watchers: 50 },
  { id: "KN", bbhouseholds: 100, watchers: 50 },
  { id: "LC", bbhouseholds: 100, watchers: 50 },
  { id: "MF", bbhouseholds: 100, watchers: 50 },
  { id: "PM", bbhouseholds: 100, watchers: 50 },
  { id: "VC", bbhouseholds: 100, watchers: 50 },
  { id: "WS", bbhouseholds: 100, watchers: 50 },
  { id: "SM", bbhouseholds: 100, watchers: 50 },
  { id: "ST", bbhouseholds: 100, watchers: 50 },
  { id: "SA", bbhouseholds: 100, watchers: 50 },
  { id: "SN", bbhouseholds: 100, watchers: 50 },
  { id: "RS", bbhouseholds: 100, watchers: 50 },
  { id: "SC", bbhouseholds: 100, watchers: 50 },
  { id: "SL", bbhouseholds: 100, watchers: 50 },
  { id: "SG", bbhouseholds: 100, watchers: 50 },
  { id: "SX", bbhouseholds: 100, watchers: 50 },
  { id: "SK", bbhouseholds: 100, watchers: 50 },
  { id: "SI", bbhouseholds: 100, watchers: 50 },
  { id: "SB", bbhouseholds: 100, watchers: 50 },
  { id: "SO", bbhouseholds: 100, watchers: 50 },
  { id: "ZA", bbhouseholds: 100, watchers: 50 },
  { id: "GS", bbhouseholds: 100, watchers: 50 },
  { id: "SS", bbhouseholds: 100, watchers: 50 },
  { id: "ES", bbhouseholds: 100, watchers: 50 },
  { id: "LK", bbhouseholds: 100, watchers: 50 },
  { id: "SD", bbhouseholds: 100, watchers: 50 },
  { id: "SR", bbhouseholds: 100, watchers: 50 },
  { id: "SJ", bbhouseholds: 100, watchers: 50 },
  { id: "SZ", bbhouseholds: 100, watchers: 50 },
  { id: "SE", bbhouseholds: 100, watchers: 50 },
  { id: "CH", bbhouseholds: 100, watchers: 50 },
  { id: "SY", bbhouseholds: 100, watchers: 50 },
  { id: "TW", bbhouseholds: 100, watchers: 50 },
  { id: "TJ", bbhouseholds: 100, watchers: 50 },
  { id: "TZ", bbhouseholds: 100, watchers: 50 },
  { id: "TH", bbhouseholds: 100, watchers: 50 },
  { id: "TL", bbhouseholds: 100, watchers: 50 },
  { id: "TG", bbhouseholds: 100, watchers: 10 },
  { id: "TK", bbhouseholds: 100, watchers: 20 },
  { id: "TO", bbhouseholds: 60, watchers: 30 },
  { id: "TT", bbhouseholds: 70, watchers: 40 },
  { id: "TN", bbhouseholds: 80, watchers: 60 },
  { id: "TR", bbhouseholds: 90, watchers: 70 },
  { id: "TM", bbhouseholds: 50, watchers: 80 },
  { id: "TC", bbhouseholds: 250, watchers: 90 },
  { id: "TV", bbhouseholds: 200, watchers: 150 },
  { id: "UG", bbhouseholds: 180, watchers: 250 },
  { id: "UA", bbhouseholds: 150, watchers: 150 },
  { id: "AE", bbhouseholds: 50, watchers: 250 },
  { id: "GB", bbhouseholds: 300, watchers: 150 },
  { id: "US", bbhouseholds: 500, watchers: 500 }
]

const baseGeoStyle = d => {
  return d.bbhouseholds
    ? { fill: "purple", stroke: "none" }
    : { fill: "orange", stroke: "none" }
}

const secondaryGeoStyle = d => {
  return !d.bbhouseholds
    ? { fill: "darkred", stroke: "none" }
    : d.bbhouseholds > 100
    ? { fill: "steelblue", stroke: "purple" }
    : { fill: "lightgreen", stroke: "none" }
}

class SimpleDorling extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      carto: false,
      sizeByBasic: false,
      size: [500, 500],
      geoStyle: baseGeoStyle
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ carto: !this.state.carto })}>
          Change
        </button>
        <button
          onClick={() =>
            this.setState({ sizeByBasic: !this.state.sizeByBasic })
          }
        >
          Change SizeBy
        </button>
        <button
          onClick={() =>
            this.setState({ filteredGeodata: !this.state.filteredGeodata })
          }
        >
          Change Geodata
        </button>
        <button
          onClick={() =>
            this.setState({
              size: this.state.size[0] === 500 ? [800, 600] : [500, 500]
            })
          }
        >
          Change Size
        </button>
        <button onClick={() => this.setState({ geoStyle: secondaryGeoStyle })}>
          Change Style Fn
        </button>

        <ResponsiveDorlingCartogram
          responsiveWidth
          showBorders
          cartogram={this.state.carto}
          //          circleStyle={{ fill: 'red' }}
          //          customMark={customMark}
          geoStyle={this.state.geoStyle}
          transitionSeconds={2}
          size={this.state.size}
          sizeBy={this.state.sizeByBasic ? dynamicSize : staticSize}
          projectionType={geoNaturalEarth1}
          data={countryData}
          mapData={this.state.filteredGeodata ? secondGeoData : geodata}
          onHover={d => {
            console.info("hover d", d)
          }}
          circlePadding={5}
          label={d =>
            d.id ? (
              <text
                fill="white"
                textAnchor="middle"
                fontWeight={900}
                fontSize={`${d.r / 2}px`}
                y={d.r / 3.5}
              >
                {d.id}
              </text>
            ) : (
              ""
            )
          }
        />
        <pre>
          {`import React from 'react';
import DorlingCartogram from '../src/DorlingCartogram';
// import { geoAzimuthalEquidistant } from 'd3-geo';

const dynamicSize = (d, i) => (d.watchers && d.watchers / 10) || i / 10 + 5;
const staticSize = d => (d.bbhouseholds && d.bbhouseholds / 10) || 0;
const countryData = [
  { id: 'PE', bbhouseholds: 100, watchers: 50 },
  { id: 'PH', bbhouseholds: 90, watchers: 40 },
  { id: 'PN', bbhouseholds: 80, watchers: 30 },
  { id: 'PL', bbhouseholds: 70, watchers: 20 },
  { id: 'PT', bbhouseholds: 60, watchers: 10 },
  { id: 'PR', bbhouseholds: 100, watchers: 50 },
  { id: 'QA', bbhouseholds: 100, watchers: 50 },
  { id: 'RE', bbhouseholds: 100, watchers: 50 },
  { id: 'RO', bbhouseholds: 100, watchers: 50 },
  { id: 'RU', bbhouseholds: 100, watchers: 50 },
  { id: 'RW', bbhouseholds: 100, watchers: 50 },
  { id: 'BL', bbhouseholds: 100, watchers: 50 },
  { id: 'SH', bbhouseholds: 100, watchers: 50 },
  { id: 'KN', bbhouseholds: 100, watchers: 50 },
  { id: 'LC', bbhouseholds: 100, watchers: 50 },
  { id: 'MF', bbhouseholds: 100, watchers: 50 },
  { id: 'PM', bbhouseholds: 100, watchers: 50 },
  { id: 'VC', bbhouseholds: 100, watchers: 50 },
  { id: 'WS', bbhouseholds: 100, watchers: 50 },
  { id: 'SM', bbhouseholds: 100, watchers: 50 },
  { id: 'ST', bbhouseholds: 100, watchers: 50 },
  { id: 'SA', bbhouseholds: 100, watchers: 50 },
  { id: 'SN', bbhouseholds: 100, watchers: 50 },
  { id: 'RS', bbhouseholds: 100, watchers: 50 },
  { id: 'SC', bbhouseholds: 100, watchers: 50 },
  { id: 'SL', bbhouseholds: 100, watchers: 50 },
  { id: 'SG', bbhouseholds: 100, watchers: 50 },
  { id: 'SX', bbhouseholds: 100, watchers: 50 },
  { id: 'SK', bbhouseholds: 100, watchers: 50 },
  { id: 'SI', bbhouseholds: 100, watchers: 50 },
  { id: 'SB', bbhouseholds: 100, watchers: 50 },
  { id: 'SO', bbhouseholds: 100, watchers: 50 },
  { id: 'ZA', bbhouseholds: 100, watchers: 50 },
  { id: 'GS', bbhouseholds: 100, watchers: 50 },
  { id: 'SS', bbhouseholds: 100, watchers: 50 },
  { id: 'ES', bbhouseholds: 100, watchers: 50 },
  { id: 'LK', bbhouseholds: 100, watchers: 50 },
  { id: 'SD', bbhouseholds: 100, watchers: 50 },
  { id: 'SR', bbhouseholds: 100, watchers: 50 },
  { id: 'SJ', bbhouseholds: 100, watchers: 50 },
  { id: 'SZ', bbhouseholds: 100, watchers: 50 },
  { id: 'SE', bbhouseholds: 100, watchers: 50 },
  { id: 'CH', bbhouseholds: 100, watchers: 50 },
  { id: 'SY', bbhouseholds: 100, watchers: 50 },
  { id: 'TW', bbhouseholds: 100, watchers: 50 },
  { id: 'TJ', bbhouseholds: 100, watchers: 50 },
  { id: 'TZ', bbhouseholds: 100, watchers: 50 },
  { id: 'TH', bbhouseholds: 100, watchers: 50 },
  { id: 'TL', bbhouseholds: 100, watchers: 50 },
  { id: 'TG', bbhouseholds: 100, watchers: 50 },
  { id: 'TK', bbhouseholds: 100, watchers: 50 },
  { id: 'TO', bbhouseholds: 100, watchers: 50 },
  { id: 'TT', bbhouseholds: 100, watchers: 50 },
  { id: 'TN', bbhouseholds: 100, watchers: 50 },
  { id: 'TR', bbhouseholds: 100, watchers: 50 },
  { id: 'TM', bbhouseholds: 100, watchers: 50 },
  { id: 'TC', bbhouseholds: 100, watchers: 50 },
  { id: 'TV', bbhouseholds: 100, watchers: 50 },
  { id: 'UG', bbhouseholds: 100, watchers: 50 },
  { id: 'UA', bbhouseholds: 100, watchers: 50 },
  { id: 'AE', bbhouseholds: 100, watchers: 50 },
  { id: 'GB', bbhouseholds: 100, watchers: 50 },
  { id: 'US', bbhouseholds: 100, watchers: 50 }
];

class SimpleDorling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carto: false,
      sizeByBasic: false
    };
  }

  render() {
    return (
      <div>
        Put a Cartogram here!!!!
        <button onClick={() => this.setState({ carto: !this.state.carto })}>
          Change
        </button>
        <button
          onClick={() =>
            this.setState({ sizeByBasic: !this.state.sizeByBasic })
          }
        >
          Change SizeBy
        </button>
        <DorlingCartogram
          cartogram={this.state.carto}
          circleStyle={{ fill: 'red' }}
          geoStyle={d =>
            (d.bbhouseholds ? { fill: 'purple' } : { fill: 'orange' })
          }
          transitionSeconds={0.5}
          size={[1500, 800]}
          sizeBy={this.state.sizeByBasic ? dynamicSize : staticSize}
          //          projectionType={geoAzimuthalEquidistant}
          data={countryData}
        />
      </div>
    );
  }
}

export default SimpleDorling;`}
        </pre>
      </div>
    )
  }
}

export default SimpleDorling
