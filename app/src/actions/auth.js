import {authConstants} from "../store/constants";
import apiActions from '../services/apiActions';
import {getCookie} from "../utils/helpers";

const getSubDomain = () => {
    return window.location.hostname.split('.')[0];
};

const getMainDomain = () => {
    const hostParts = window.location.hostname.split('.');
    return hostParts[1] + '.' + hostParts[2];
};

export const setTokenFromCookie = () => {
    const token = getCookie('token');
    document.cookie = 'token=;domain=' +  getMainDomain() + ';path=/';
    return {
        type: authConstants.SET_TOKEN,
        token,
    };
};

export const refreshAuth = () => (dispatch) => {
    apiActions.get('/auth/refresh')
        .then(response => dispatch(setCurrentUser(response.data.data)))
        .catch(err => dispatch({type: authConstants.REFRESH_FAILED}));
};

export const setCurrentUser = ({user, token, bookspace}) => {
    const needToChangeSubdomain = Boolean(bookspace && bookspace.subdomain !== getSubDomain());
    if (needToChangeSubdomain) {
        // Set short-live cookie to transfer authorization to another subdomain
        document.cookie = "token=" + token + ";domain=" + getMainDomain() + ";path=/;max-age=60";
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