import React from 'react';

import './App.css';
import {SidePanelContainer} from './components/SidePanel';
import {LocoMapContainer} from './components/LocoMap';


class App extends React.Component {
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
