import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import {List} from 'immutable';

import * as actions from '../actions';


export class SidePanel extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

    getLocos() {
	return this.props.locos || List([]);
    }
    
  render() {
    return (
	    <div className="sidePanel">
	    
	Sharing: {this.props.isSharing ? "true" : "false"}

	{this.getLocos().map(loco =>
			     <div>
			     <p>{loco.name}</p>
			     <img src={loco.image} />
			     </div>
			    )}

	
	</div>
    );
  }
  
}


// Set up redux-connected component
const mapStateToProps = (state) => {
  return {
      isSharing: state.get('isSharing'),
      locos: state.get('locos')
  };
}
export const SidePanelContainer = connect(mapStateToProps, actions)(SidePanel);
