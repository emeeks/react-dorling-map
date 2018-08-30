import React from 'react';
import InteractionLayer from './InteractionLayer';
import VisualizationLayer from './VisualizationLayer';

class DorlingCartogram extends React.Component {
  constructor(props) {
    const {
      geoStyle = () => ({ fill: 'gold', stroke: 'black' }),
      circleStyle = geoStyle || (() => ({ fill: 'gold', stroke: 'black' })),
      label
    } = props;

    const labelFn = label === true ? d => d.id : label;

    super(props);
    this.state = {
      voronoiPoints: undefined,
      geoStyleFn: typeof geoStyle === 'function' ? geoStyle : () => geoStyle,
      circleStyleFn:
        typeof circleStyle === 'function' ? circleStyle : () => circleStyle,
      labelFn
    };
  }

  passVoronoiPoints = (points) => {
    this.setState({ voronoiPoints: points });
  }

  render() {
    const {
      size = [500, 500],
      data,
      cartogram,
      mapData,
      zoomToFit,
      sizeBy,
      onHover
    } = this.props;
    const { circleStyleFn, geoStyleFn, labelFn } = this.state;

    return (
      <div>
        <svg width={size[0]} height={size[1]}>
          <VisualizationLayer
            data={data}
            cartogram={cartogram}
            size={size}
            mapData={mapData}
            circleStyleFn={circleStyleFn}
            geoStyleFn={geoStyleFn}
            labelFn={labelFn}
            zoomToFit={zoomToFit}
            sizeBy={sizeBy}
            onHover={onHover}
            passVoronoiPoints={this.passVoronoiPoints}
          />
          {cartogram === true &&
            this.state.voronoiPoints && (
              <InteractionLayer
                size={size}
                points={this.state.voronoiPoints}
                onHover={onHover}
              />
            )}
        </svg>
      </div>
    );
  }
}

export default DorlingCartogram;
