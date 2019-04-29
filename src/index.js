import React from 'react';
import ReactDOM from 'react-dom';
//configurando o redux
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import AuthOrApp from './main/authOrApp';
import reducers from './main/reducers';

/**
 * <b>devTools</b>  "Integra" a aplicação com a extensão de desenvolvimento do redux 
 * Link da extensão do chrome: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related
 * OBS: O mesmo deverá ser passado na hora de criar as histórias do reducers
 */
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
      && window.__REDUX_DEVTOOLS_EXTENSION__();

/**
 * store: estado unico da aplicação
 * applyMiddleware, aplica os middlewares necessários para a aplicação
 * createStore: cria a store
 * reducers: aplica e configura os reducers da aplicação para a store
 */
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools);

ReactDOM.render(
    <Provider store={store}>
        <AuthOrApp />
    </Provider>
, document.getElementById('app'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
