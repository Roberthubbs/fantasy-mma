import merge from 'lodash/merge';
import { RECEIVE_LEAGUE, RECEIVE_USER_LEAGUES, RECEIVE_STORED_LEAGUE } from '../actions/league-actions';
const leagueReducer = (state = {}, action) => {
    Object.freeze(state);
    console.log('inside reducer')
    console.log(action);
    switch (action.type) {
        case RECEIVE_LEAGUE:
            debugger;
            return merge({}, state, action.data);
        case RECEIVE_USER_LEAGUES:
            debugger;
            return merge({}, state, action.userLeagues.data);
        case RECEIVE_STORED_LEAGUE:
            debugger;
            return merge({}, state, action.data);
        default:
            return state;
    }

}

export default leagueReducer;