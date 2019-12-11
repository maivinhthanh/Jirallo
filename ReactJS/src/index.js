import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist'
import { createFilter   } from 'redux-persist-transform-filter';
import storage from 'redux-persist/es/storage'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './Store/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedFilter = createFilter(
    'auth', ['access', 'refresh']
);
const reducer = persistReducer(
    {
      key: 'polls',
      storage: storage,
      whitelist: ['auth'],
      transforms: [ persistedFilter]
    },
    rootReducer
)

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));
persistStore(store)
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
serviceWorker.unregister();
