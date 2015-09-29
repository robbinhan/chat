import React from 'react';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import UserBox from './containers/UserBox';
import userReducer from './reducers/user';
import logger from 'redux-diff-logger';

let createStoreWithMiddleware = applyMiddleware(
  logger
)(createStore);

let store = createStoreWithMiddleware(userReducer);

// console.log('store',store,'reducer',userReducer,'state',window.STATE_FROM_SERVER);

// store.dispatch(setVisibilityFilter('SHOW_ACTIVE'));

React.render(
    <Provider store={store} >
        {() => <UserBox /> }
    </Provider>,
    document.getElementById('im'));