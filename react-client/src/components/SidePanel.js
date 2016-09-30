import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import {List} from 'immutable';

import './SidePanel.css';
import * as actions from '../actions';


export class SidePanel extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

    getLocos() {
	return this.props.locos || List([]);
    }

    onShareChange() {
	this.props.updateSharing(!this.props.isSharing);
    }
    
  render() {
    return (
	    <div className="sidePanel">
	    <div className='sharingText'>Sharing</div>
	    <div className='switchContainer'>
	    <span className='switchLabel'>
	    Off
	    </span>
	    <span>
	    <label className="switch">
	    <input type="checkbox" checked={this.props.isSharing} onChange={this.onShareChange.bind(this)} />
	    <div className="slider"></div>
	    </label>
	    </span>
	    <span className='switchLabel'>
	    On
	</span>
	    </div>
	{this.getLocos().map(loco =>
			     <div className='userbox'>
			     <img src={loco.image} />
			     <p>{loco.name}</p>
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
