import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store/configureStore';
import App from './App';
import './index.css'; // Assuming you have some global styles
import './global.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(_jsx(Provider, { store: store, children: _jsx(React.StrictMode, { children: _jsx(App, {}) }) }));
