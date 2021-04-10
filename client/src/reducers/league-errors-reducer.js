import {
    RECEIVE_LEAGUE_ERROR, RECEIVE_LEAGUE
} from '../actions/league-actions';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LEAGUE_ERROR:

            return action.errors.data;
        case RECEIVE_LEAGUE:

            return [];
        case RESET_LEAGUE_ERRORS:
            return [];
        default:
            return state;
    }
};