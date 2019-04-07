import {logout, refreshAuth} from "../store/actions/auth";
import {getJWTPayload} from "../utils/helpers";

/*
 Check the expiration of JWT token.
 If it is close to expiration - refresh it.
 If it is expired already - logout.
*/
export const authWatchdog = (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    if (!token) return;

    const payload = getJWTPayload(token);
    if (!payload) return;

    const secondsLeft = parseInt(payload.exp - (Date.now() / 1000));
    const tokenLifetime = payload.exp - payload.iat;
    const tenPercentOfTokenLifetime = parseInt(0.1 * tokenLifetime);
    const alreadyExpired = Boolean(secondsLeft <= 1);
    const closeToExpire = Boolean(secondsLeft < tenPercentOfTokenLifetime);

    if (alreadyExpired) {
        dispatch(logout());
    } else if (closeToExpire) {
        dispatch(refreshAuth());
    }
};