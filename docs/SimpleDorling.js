import React from 'react';
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
    );
  }
}

export default SimpleDorling;
