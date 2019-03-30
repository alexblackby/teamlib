import {authConstants} from "../constants";
import apiActions from '../../services/apiActions';
import {deleteCookie, getCookie, getMainDomain, getSubDomain, setCookie} from "../../utils/helpers";

export const setTokenFromCookie = () => {
    const token = getCookie('token');
    deleteCookie('token');
    return {
        type: authConstants.SET_TOKEN,
        token,
    };
};

export const refreshAuth = () => (dispatch) => {
    apiActions.get('/auth/refresh')
        .then(data => dispatch(setCurrentUser(data)))
        .catch(err => dispatch({type: authConstants.REFRESH_FAILED}));
};

export const setCurrentUser = ({user, token, bookspace}) => {
    const needToChangeSubdomain = Boolean(bookspace && bookspace.subdomain !== getSubDomain());
    if (needToChangeSubdomain) {
        // Set short-live cookie to transfer authorization to another subdomain
        setCookie('token', token, 60);
        window.location.assign('//' + bookspace.subdomain + '.' + getMainDomain());
    } else {
        return {
            type: authConstants.SET_CURRENT_USER,
            user,
            bookspace,
            token,
        };
    }
};

export const logout = () => {
    return {
        type: authConstants.LOGOUT,
    };
};

export const setInvite = (code, name) => {
    return {
        type: authConstants.SET_INVITE,
        code,
        name,
    };
};

export const clearInvite = () => {
    return {
        type: authConstants.CLEAR_INVITE,
    };
};