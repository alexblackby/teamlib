import {authConstants} from "../constants";

const initialState = {
    user: null,
    token: null,
};

const auth = (state = initialState, action) => {
    if (action.type === authConstants.SET_CURRENT_USER) {
        return Object.assign({}, state, {
            user: action.user,
            token: action.token,
        });
    }
    if (action.type === authConstants.LOGOUT) {
        return Object.assign({}, state, {
            user: null,
            token: null,
        });
    }
    return state;
};

export default auth;