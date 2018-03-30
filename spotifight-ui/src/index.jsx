import React from 'react';
import { render } from 'react-dom';
// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import allReducers from './reducers/index';
import configureStore from './configureStore';
import './index.scss';

// material
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// import indigo from 'material-ui/colors/indigo';
// import pink from 'material-ui/colors/pink';
// import red from 'material-ui/colors/red';

// // All the following keys are optional.
// // We try our best to provide a great default value.
// const theme = createMuiTheme({
//   palette: {
//     primary: indigo,
//     secondary: pink,
//     error: red,
//     // Used by `getContrastText()` to maximize the contrast between the background and
//     // the text.
//     contrastThreshold: 3,
//     // Used to shift a color's luminance by approximately
//     // two indexes within its tonal palette.
//     // E.g., shift from Red 500 to Red 300 or Red 700.
//     tonalOffset: 0.2
//   }
// });



import App from './App';

const store = createStore(allReducers);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={configureStore().persistor}>
      {/* <MuiThemeProvider> */}
        <App />
      {/* </MuiThemeProvider> */}
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
