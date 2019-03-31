export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (!serializedState) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (getState) => {
    try {
        const state = getState();
        const stateToSave = {
            auth: state.auth,
        };
        const serializedState = JSON.stringify(stateToSave);
        localStorage.setItem('state', serializedState);
    } catch (err) {

    }
};