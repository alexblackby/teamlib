import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from './reducers';
import {loadState, saveState} from "../services/localStorage";
import apiActions from "../services/apiActions";

export default function configureStore() {
    const preloadedState = loadState();
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunk)
    );

    const saveStateWorker = () => {
        const {auth} = store.getState();
        saveState({auth});
    };
    store.subscribe(throttle(saveStateWorker, 1000));

    apiActions.configure('http://api.teamlib.local', store.getState);

    return store;
}