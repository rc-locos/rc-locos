import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App';
import './index.css';
import reducer from './reducer';
import {setState} from './actions';


const store = createStore(reducer);

// Hard-coded initial state
import {Map} from 'immutable';
const state0 =  Map({
  isSharing: false,
  locos: [
    {
      coord: [0, 0],
      name: "Zero"
    },
    {
      coord: [1, 1],
      name: "One"
    },
    {
      coord: [2, 2],
      name: "Two"
    }
  ],
});
store.dispatch(setState(state0));


ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);
