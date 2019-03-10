import {authConstants} from "../constants";

export const setCurrentUser = ({user, token}) => ({
    type: authConstants.SET_CURRENT_USER,
    user,
    token
});

export const logout = () => ({
    type: authConstants.LOGOUT,
});