import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
    RESET_SESSION_ERRORS
} from '../actions/session-actions';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:

            return action.errors.response.data;
        case RECEIVE_CURRENT_USER:

            return [];
        case RESET_SESSION_ERRORS:
            return [];
        default:
            return state;
    }
};