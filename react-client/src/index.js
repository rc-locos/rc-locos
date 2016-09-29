import 'babel-polyfill'

import thunkMiddleware from 'redux-thunk'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, browserHistory } from 'react-router'

import {AppContainer} from './App';
import reducer from './reducer';
import {fetchLocos, fetchSharing, setState} from './actions';
import './index.css';


const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  )
);

// Fetch application state
store.dispatch(fetchLocos()).then(store.dispatch(fetchSharing()));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/(:share/:lat/:lng)" component={AppContainer} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
