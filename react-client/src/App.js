import React from 'react';

import './App.css';
import {LocoFormContainer} from './components/LocoForm';
import {LocoMapContainer} from './components/LocoMap';


class App extends React.Component {
  render() {
    return (
      <div className="App">
	<LocoMapContainer />
	<LocoFormContainer />
      </div>
    );
  }
}

export default App;
