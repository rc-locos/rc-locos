import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

import * as actions from '../actions';


export class LocoMap extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {showingInfoWindow: false};
  }

  getLocos() {
    return this.props.locos || [];
  }

  // A point on the map is clicked
  onMapClicked(mapProps, map, clickEvent) {
    console.log(clickEvent.latLng.lat(), clickEvent.latLng.lng());
    this.setState({showingInfoWindow: true});
  }

  // Marker is clicked
  onMarkerClick(props, marker, e) {
  }
  
  render() {
    return (
      <div className="mapContainer">
	
	<Map google={window.google} onClick={this.onMapClicked.bind(this)}>
	  <Marker onClick={this.onMarkerClick} name={'Current location'} />
	  <InfoWindow visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}>
	    <div>
	      <h1>{/*this.state.selectedPlace.name*/}</h1>
	      <h1>Hello</h1>
	    </div>
	  </InfoWindow>
	</Map>
	
	<ul>
	  {this.getLocos().map(loco => <li key={loco.name}>{loco.name}, {loco.coord}</li>)}
	</ul>
      </div>
    );
  }
  
}

// Set Google Map api
const LocoMapKey = GoogleApiWrapper({
  apiKey: 'AIzaSyApYKQNcnzFoSa4TP-l7PB4IoDm-pyT66w'
})(LocoMap)


// Set up redux-connected component
const mapStateToProps = (state) => {
  return {
    locos: state.get('locos')
  };
}
export const LocoMapContainer = connect(mapStateToProps, actions)(LocoMapKey);
