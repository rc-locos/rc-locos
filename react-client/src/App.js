import React from 'react';

import './App.css';
import {LocoForm} from './components/LocoForm';
import {LocoMap} from './components/LocoMap';


class App extends React.Component {
  render() {
    return (
      <div className="App">
      <LocoMap />
      <LocoForm onSubmit={() => alert("submitted")} />
      </div>
    );
  }
}

export default App;
