import React, { Component } from 'react';
import './App.css';

import Form from './components/Form';
import Map from './components/Map';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Map />
      <Form />
      </div>
    );
  }
}

export default App;
