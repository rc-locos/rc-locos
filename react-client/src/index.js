import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App';
import './index.css';

import reducer from './reducer';

const store = createStore(reducer);

const locos = [
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
]

ReactDOM.render(
	<Provider store={store}>
	<App locos={locos} />
	</Provider>,
    document.getElementById('root')
);
