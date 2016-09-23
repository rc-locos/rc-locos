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
    { name: "Recurse Center",
      lat: 40.7206499,
      lng: -74.0031909,
    },
    {
      name: "User 1",
      lat: 40.7589,
      lng: -73.9851,
    },
    {
      name: "User 2",
      lat: 40.6602,
      lng: -73.9690,
    },
    {
      name: "User 3",
      lat: 40.7829,
      lng: -73.9654,
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
