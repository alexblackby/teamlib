import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from './reducers';
import {loadState, saveState} from "../services/localStorage";
import {authWatchdog} from "../services/auth";
import apiActions from "../services/apiActions";

export default function configureStore() {
    const preloadedState = loadState();
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunk)
    );

    apiActions.configure('http://api.teamlib.local', store.getState);

    const runAuthWatchdog = () => {
        authWatchdog(store.dispatch, store.getState);
    };
    runAuthWatchdog();
    setInterval( runAuthWatchdog, 1000);

    const runSaveState = () => {
        saveState(store.getState);
    };
    store.subscribe(throttle(runSaveState, 1000));

    return store;
}