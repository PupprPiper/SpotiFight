import React from 'react';
import { render } from 'react-dom';
// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import allReducers from './reducers/index';
import configureStore from './configureStore';
import './index.scss';

import App from './App';

const store = createStore(allReducers);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={configureStore().persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
