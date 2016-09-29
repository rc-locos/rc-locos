import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import './App.css';
import {SidePanelContainer} from './components/SidePanel';
import {LocoMapContainer} from './components/LocoMap';

import * as actions from './actions';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      
    if (this.props.params.share === 'share' &&
	this.props.params.lat && this.props.params.lng) {
      // 	console.log(this.props.params.share);
      // console.log(this.props.params.lat);
	// console.log(this.props.params.lng);

	// Update location of user
	this.props.updateLoco(this.props.params.lat, this.props.params.lng);
    }
  }
  
  render() {
    return (
      <div className="App">
	<SidePanelContainer />
	<LocoMapContainer />
      </div>
    );
  }
}

// Set up redux-connected component
const mapStateToProps = (state) => {
  return {
      
  };
}
export const AppContainer = connect(mapStateToProps, actions)(App);
