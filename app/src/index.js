import './styles/index.css';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import AppOld from './components/app/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import {BrowserRouter} from "react-router-dom";

const store = configureStore();

render(
    <Provider store={store}>
        <BrowserRouter>
            <AppOld/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();