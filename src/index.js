import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store'
import 'nprogress/nprogress.css'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react'
import {
  BrowserRouter, Routes,
  Route,
} from "react-router-dom";
import Layout from './Layout';
import "react-awesome-lightbox/build/style.css";
// import i18n (needs to be bundled ;))

import i18n from './utils/i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter>

          <Layout />
        </BrowserRouter>

      </React.StrictMode>
    </PersistGate>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
