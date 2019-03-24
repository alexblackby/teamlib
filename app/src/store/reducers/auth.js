import {authConstants} from "../constants";

const initialState = {
    user: null,
    bookspace: null,
    token: null,
    refreshInProgress: false,
};

const auth = (state = initialState, action) => {
    if (action.type === authConstants.SET_CURRENT_USER) {
        return Object.assign({}, state, {
            user: action.user,
            bookspace: action.bookspace,
            token: action.token,
            refreshInProgress: false,
        });
    }
    if (action.type === authConstants.SET_TOKEN) {
        return Object.assign({}, state, {
            token: action.token,
        });
    }
    if (action.type === authConstants.REFRESH_STARTED) {
        return Object.assign({}, state, {
            refreshInProgress: true,
        });
    }
    if (action.type === authConstants.REFRESH_FAILED) {
        return Object.assign({}, state, {
            refreshInProgress: false,
        });
    }
    if (action.type === authConstants.LOGOUT) {
        return Object.assign({}, initialState);
    }
    return state;
};

export default auth;