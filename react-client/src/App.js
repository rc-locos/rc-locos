import React from 'react';

import './App.css';
import {SidePanelContainer} from './components/SidePanel';
import {LocoMapContainer} from './components/LocoMap';


class App extends React.Component {

  constructor(props) {
    super(props);

    if (this.props.params.share === 'share' &&
	this.props.params.lat && this.props.params.lng) {
      console.log(this.props.params.share);
      console.log(this.props.params.lat);
      console.log(this.props.params.lng);
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

export default App;
