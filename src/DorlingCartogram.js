import React from "react"
import InteractionLayer from "./InteractionLayer"
import VisualizationLayer from "./VisualizationLayer"

const basicStyleFn = () => ({ fill: "gold", stroke: "black" })

class DorlingCartogram extends React.Component {
  constructor(props) {
    const {
      geoStyle = basicStyleFn,
      circleStyle = geoStyle || basicStyleFn,
      label
    } = props

    const labelFn = label === true ? d => d.id : label

    super(props)
    this.state = {
      voronoiPoints: undefined,
      geoStyleFn: typeof geoStyle === "function" ? geoStyle : () => geoStyle,
      circleStyleFn:
        typeof circleStyle === "function" ? circleStyle : () => circleStyle,
      labelFn,
      props
    }
  }

  static defaultProps = {
    size: [500, 500]
  }

  passVoronoiPoints = points => {
    this.setState({ voronoiPoints: points })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { props } = prevState

    const { label } = nextProps

    if (
      nextProps.geoStyle !== props.geoStyle ||
      nextProps.circleStyle !== props.circleStyle ||
      nextProps.label !== props.label
    ) {
      const {
        geoStyle = basicStyleFn,
        circleStyle = geoStyle || basicStyleFn
      } = nextProps

      const labelFn = nextProps.label === true ? d => d.id : nextProps.label

      return {
        geoStyleFn: typeof geoStyle === "function" ? geoStyle : () => geoStyle,
        circleStyleFn:
          typeof circleStyle === "function" ? circleStyle : () => circleStyle,
        labelFn,
        props: nextProps
      }
    }
    return null
  }

  render() {
    const {
      size,
      data,
      cartogram,
      mapData,
      zoomToFit,
      sizeBy,
      onHover,
      showBorders,
      projectionType,
      customMark,
      customMarkTransition,
      transitionSeconds,
      numberOfCirclePoints,
      circlePadding = 0
    } = this.props
    const { circleStyleFn, geoStyleFn, labelFn } = this.state

    return (
      <div>
        <svg width={size[0]} height={size[1]}>
          {mapData && (
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
              showBorders={showBorders}
              projectionType={projectionType}
              customMark={customMark}
              transitionSeconds={transitionSeconds}
              customMarkTransition={customMarkTransition}
              numberOfCirclePoints={numberOfCirclePoints}
              circlePadding={circlePadding}
            />
          )}
          {onHover && cartogram === true && this.state.voronoiPoints && (
            <InteractionLayer
              size={size}
              points={this.state.voronoiPoints}
              onHover={onHover}
            />
          )}
        </svg>
      </div>
    )
  }
}

export default DorlingCartogram
