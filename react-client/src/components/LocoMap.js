import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

import {List} from 'immutable';
  
import * as actions from '../actions';


export class LocoMap extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: null,
      newMarker: null,
      /*       newPos: {lat: 9999999, lng: 9999999},*/
      /*       newPos: {lat: 40.7206499, lng: -74.0032909},*/
    };
  }

  getLocos() {
    console.log(this.props.locos);
    return this.props.locos || List([]);
  }

  // A point on the map is clicked
  onMapClicked2(mapProps, map, e) {
    // Clear out existing marker
    if (this.state.newMarker) {
      this.state.newMarker.setMap(null);
    }

    // Create new marker
    const latlng = new window.google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
    const marker = new window.google.maps.Marker({
      map: map,
      position: latlng,
    });
    this.setState({
      newMarker: marker,
    });
    // Create information window on the marker
    const infowindow = new window.google.maps.InfoWindow({
      content: "<div>Do you want to share this location with RC? <button>Yes</button><button>No</button></div>"
    });
    infowindow.open(map, marker);
  }

  onMapClicked(mapProps, map, e) {
    // Clear out existing marker
    if (this.state.newMarker)
      this.state.newMarker.setMap(null);

    this.props.submitCoords(e.latLng.lat(), e.latLng.lng());
  }
  
  // Marker is clicked
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  
  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false
    });
  }

  render() {
    return (
      <div className="mapContainer">
	<Map google={window.google}
	     onClick={this.onMapClicked.bind(this)}
	     initialCenter={{lat: 40.720683, lng: -74.001001}}>
	  {this.getLocos().map(loco =>
	    <Marker key={loco.id + '.' + Date.now()}
		    loco={loco}
		    name={loco.name}
		    position={{lat: loco.lat, lng: loco.lng}}
		    onClick={this.onMarkerClick.bind(this)} />
	   )}
	<InfoWindow marker={this.state.activeMarker}
		    visible={this.state.showingInfoWindow}
		    onClose={this.onInfoWindowClose.bind(this)}>
	  <div>
	    {this.state.selectedPlace?
	     <div>
	       <h1>{this.state.selectedPlace.name}</h1>
	       {this.state.selectedPlace.loco.image?
		<img src={this.state.selectedPlace.loco.image} alt="profile" />:''}
	     </div>
	     :null}
	  </div>
	</InfoWindow>

	</Map>
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
