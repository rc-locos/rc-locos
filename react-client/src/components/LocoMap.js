import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actions from '../actions';


export class LocoMap extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  getLocos() {
    return this.props.locos || [];
  }
  
  render() {
    return (
      <div className="map">
	This is where the map goes

	<ul>
	  {this.getLocos().map(loco => <li key={loco.name}>{loco.name}, {loco.coord}</li>)}
	</ul>
      </div>
    );
  }
  
}


// Set up redux-connected component
const mapStateToProps = (state) => {
  return {
    locos: state.get('locos')
  };
}
export const LocoMapContainer = connect(mapStateToProps, actions)(LocoMap);
