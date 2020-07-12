import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist'
import { createFilter   } from 'redux-persist-transform-filter';
import storage from 'redux-persist/es/storage'

import './index.css';
import App from './Core/App/App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducer'

import Register from './Core/SignUp/RegisterContainer'
import Login from './Core/Login/LoginContainer'
import ForgotPassword from './Core/ForgotPassword/ForgotPassword'
import ChangePassword from './Core/ChangPassword/ChangePassword'

import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

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
            <Router>
                <App />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/fogotpassword" component={ForgotPassword} />
                <Route path="/forgotpassword/:token" component={ChangePassword} />
            </Router>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
serviceWorker.unregister();
