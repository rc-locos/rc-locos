import React, { Component } from 'react';


class Map extends Component {
  render() {
    return (
      <div className="map">
      This is where the map goes

      <ul>
      {this.props.locos.map(loco => <li>{loco.name}, {loco.coord}</li>)}
      </ul>
      </div>
    );
  }
}


export default Map;
