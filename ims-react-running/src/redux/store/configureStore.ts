// src/redux/store/configureStore.ts

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const middleware = [thunk];

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools
    : (a: any) => a;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export default store;
