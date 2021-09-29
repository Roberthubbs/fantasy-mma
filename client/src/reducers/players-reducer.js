import merge from 'lodash/merge';
import { RECEIVE_LEAGUE_HOME_PLAYERS } from '../actions/league-actions';
const playersReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_LEAGUE_HOME_PLAYERS:
            //debugger;
            return merge({}, state, action.players.data);
        default:
            return state;
    }

}

export default playersReducer;