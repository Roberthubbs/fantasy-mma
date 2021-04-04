import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './root';
//import * as serviceWorker from './serviceWorker';
import configureStore from './store/store';
let store = configureStore();

ReactDOM.render(
  <Root store={store} />, document.getElementById('root'));
//serviceWorker.unregister();
