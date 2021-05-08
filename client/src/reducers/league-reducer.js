import merge from 'lodash/merge';
import { RECEIVE_LEAGUE, RECEIVE_USER_LEAGUES } from '../actions/league-actions';
const leagueReducer = (state = {}, action) => {
    Object.freeze(state);
    console.log('inside reducer')
    console.log(action);
    switch (action.type) {
        case RECEIVE_LEAGUE:
            //debugger;
            return merge({}, state, action.data);
        case RECEIVE_USER_LEAGUES:
            debugger;
            return merge({}, action.userLeagues.data);
        default:
            return state;
    }

}

export default leagueReducer;