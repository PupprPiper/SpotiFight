import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers/index';
import './index.scss';
import App from './App.jsx';



<<<<<<< HEAD
=======
ReactDOM.render(<h1>HEY GUYS THIS IS STYLED</h1>, document.getElementById('app'));

>>>>>>> stashem
const store = createStore(allReducers);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
