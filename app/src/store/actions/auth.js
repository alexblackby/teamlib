import {authConstants} from "../constants/constants";
import apiActions from '../../services/apiActions';
import {deleteCookie, getCookie, getMainDomain, getSubdomain, setCookie, timeInSeconds} from "../../utils/helpers";

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
    console.log({user, token, bookspace});
    const needToChangeSubdomain = Boolean(bookspace && bookspace.subdomain !== getSubdomain());
    if (needToChangeSubdomain) {
        // Set short-live cookie to transfer authorization to another subdomain
        setCookie('token', token, timeInSeconds.minute);
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
    setCookie('invite', code, timeInSeconds.hour);
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