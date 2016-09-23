import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

import * as actions from '../actions';


export class LocoMap extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: null,
      newPos: {lat: 9999999, lng: 9999999},
      /*       newPos: {lat: 40.7206499, lng: -74.0032909},*/
    };
  }

  getLocos() {
    return this.props.locos || [];
  }
  
  // A point on the map is clicked
  onMapClicked(mapProps, map, e) {
    /*     React.unmountComponentAtNode(this.refs.newPos);*/
    this.setState({newPos: {lat: e.latLng.lat(), lng: e.latLng.lng()}});
    this.forceUpdate();
    console.log(e.latLng.lat(), e.latLng.lng());
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
	    <Marker key={loco.id}
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

	{/* User's new position */}
	<Marker key={"newPos"} ref={'newPos'} position={this.state.newPos} name={"New Position"} />
	
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
