import moment from 'moment';
import $ from 'jquery';

// Initialize moment and jQuery globally
window.moment = moment;
window.jQuery = window.$ = $;

import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// Force moment to be a function if it isn't already
if (typeof moment !== 'function') {
  window.moment = function(...args) {
    return moment.default(...args);
  };
}

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// Your custom styles
import './assets/css/bootstrap.min.css';
import './assets/css/icons.min.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
// import './assets/css/c3.css';

import App from './App.jsx';
import store from './redux/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);