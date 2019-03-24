import {createSelector} from 'reselect';

export const getCurrentUser = (state) => state.auth.user;
export const getCurrentBookspace = (state) => state.auth.bookspace;

export const getCurrentUserFirstName = createSelector([getCurrentUser], (user) => {
    return (user && user.name) ? user.name.split(' ')[0] : null;
});