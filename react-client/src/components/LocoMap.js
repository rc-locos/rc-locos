import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

import {List} from 'immutable';

import InfoWindow2 from './InfoWindow';
import * as actions from '../actions';


export class LocoMap extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: null,
      // Showing second info window for new locations
      showingInfoWindow2: false,
      infoWindow2Lat: 100000000,
      infoWindow2Lng: 100000000,
    };
  }

  getLocos() {
    return this.props.locos || List([]);
  }

  // User clicked on a region on the map
  onMapClicked(mapProps, map, e) {
    // Create action to submit new location to global state
    this.props.submitCoords(e.latLng.lat(), e.latLng.lng());

    this.setState({
      showingInfoWindow2: true,
      infoWindow2Lat: e.latLng.lat(),
      infoWindow2Lng: e.latLng.lng(),
    });
    
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

  onInfoWindowClose2() {
    this.setState({
      showingInfoWindow2: false
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
      
	<InfoWindow2 visible={this.state.showingInfoWindow2}
		     lat={this.state.infoWindow2Lat}
		     lng={this.state.infoWindow2Lng}
		     onClose={this.onInfoWindowClose2.bind(this)}>
	  <div>
	    <p>Do you want to share your location with other Recursers?&nbsp;
	      <a href={"/share/"+this.state.infoWindow2Lat+"/"+this.state.infoWindow2Lng}>
		Share!
	      </a>
	    </p>
	  </div>
      </InfoWindow2>
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
