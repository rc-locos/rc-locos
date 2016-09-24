import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actions from '../actions';


export class SidePanel extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {addr: ''};
  }

  handleAddrChange(e) {
    this.setState({addr: e.target.value});
  }

  handleSubmit() {
    this.props.submitAddr(this.state.addr);
  }

  /* addBatteryPark() {
   *   
   * }*/
  
  render() {
    return (
      <div className="sidePanel">
	<input type="text" onChange={this.handleAddrChange.bind(this)} />
	<button type="button" onClick={this.handleSubmit.bind(this)} >Submit</button>
	<br />
	Sharing: {this.props.isSharing ? "true" : "false"}
      </div>
    );
  }
  
}


// Set up redux-connected component
const mapStateToProps = (state) => {
  return {
    isSharing: state.get('isSharing')
  };
}
export const SidePanelContainer = connect(mapStateToProps, actions)(SidePanel);
