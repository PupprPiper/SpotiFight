import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
=======
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers/index';
>>>>>>> b57c6b19b9050463e5a8af1026ca4ad9be435ab1
import './index.scss';
import App from './App.jsx';

import App from './App';

<<<<<<< HEAD
ReactDOM.render(<h1>HEY GUYS THIS IS STYLED</h1>, document.getElementById('app'));
=======
const store = createStore(allReducers);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
>>>>>>> b57c6b19b9050463e5a8af1026ca4ad9be435ab1
