import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import thunk from 'redux-thunk';
import Register from './components/Register';
import Login from './components/Login';
import BaseLayout from './components/BaseLayout';
import AddSnippet from './components/AddSnippet';
import ViewSnippets from './components/ViewSnippets';
import UpdateSnippet from './components/UpdateSnippet';
import {setAuthenticationHeader} from './utils/authenticate';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

let token = localStorage.getItem('jwt')
setAuthenticationHeader(token)

ReactDOM.render(
    
    <BrowserRouter>
    <Provider store={store}>
        <BaseLayout>
            <Switch>
                <Route path='/' exact component={ViewSnippets}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/add-snippet' component={AddSnippet}/>
                <Route path='/update-snippet' component={UpdateSnippet}/>
            </Switch>
        </BaseLayout>
    </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
