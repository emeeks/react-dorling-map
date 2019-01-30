import React from 'react';
import elementResizeEvent from './vendor/element-resize-event';
import DorlingCartogram from './DorlingCartogram';

const createResponsiveCartogram = () =>
  class ResponsiveFrame extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        containerHeight: undefined,
        containerWidth: undefined
      };
    }

    static defaultProps = {
      size: [500, 500],
      debounce: 200
    }

    isResizing = false

    _onResize = (width, height) => {
      this.setState({ containerHeight: height, containerWidth: width });
    }
    componentDidMount() {
      const element = this.node;

      elementResizeEvent(element, () => {
        window.clearTimeout(this.isResizing);
        this.isResizing = setTimeout(() => {
          this.isResizing = false;

          this.setState({
            containerHeight: element.offsetHeight,
            containerWidth: element.offsetWidth
          });
        }, this.props.debounce);
      });
      this.setState({
        containerHeight: element.offsetHeight,
        containerWidth: element.offsetWidth
      });
    }

    render() {
      const {
        responsiveWidth,
        responsiveHeight,
        size,
        debounce,
        ...rest
      } = this.props;

      const { containerHeight, containerWidth } = this.state;

      const actualSize = [...size];

      let returnEmpty = false;

      if (responsiveWidth) {
        if (!containerWidth) returnEmpty = true;
        actualSize[0] = containerWidth;
      }

      if (responsiveHeight) {
        if (!containerHeight) returnEmpty = true;
        actualSize[1] = containerHeight;
      }

      return (
        <div
          className="responsive-container"
          style={{ height: '100%', width: '100%' }}
          ref={node => (this.node = node)}
        >
          {!returnEmpty && <DorlingCartogram {...rest} size={actualSize} />}
        </div>
      );
    }
  };

export default createResponsiveCartogram();
