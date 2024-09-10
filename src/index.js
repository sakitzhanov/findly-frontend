import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import i18n from "i18next";
import reportWebVitals from './reportWebVitals';
import { initReactI18next } from 'react-i18next';
import languagedetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { Provider } from 'react-redux';
import store from './redux';

i18n
  .use(initReactI18next)
  .use(languagedetector)
  .use(HttpApi)
  .init({
    fallbackLng: "kk",
    detection: {
      order: ['htmlTag', 'cookie', 'localStorage', 'path', 'subdomain'],
      caches: ['localStorage']
    },
    backend: {
      loadPath: '/assets/translations/{{lng}}.json'
    },
  });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();