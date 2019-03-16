import { createSelector } from 'reselect';

export const getCurrentUser = (state) => state.auth.user;

export const hasCurrentUser = createSelector(
    [getCurrentUser],
    (currentUser) => {
        return Boolean(currentUser);
    }
);