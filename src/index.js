import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';

import { createStore, applyMiddleware } from 'redux'
import chatReducer from './reducers'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(chatReducer, composeWithDevTools(applyMiddleware(thunk)));

const alertOptions = {
  offset: '90px',
  timeout: 5000,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider {...alertOptions} template={AlertTemplate}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);
