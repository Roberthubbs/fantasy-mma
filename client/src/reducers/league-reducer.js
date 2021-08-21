import merge from 'lodash/merge';
import { RECEIVE_LEAGUE, RECEIVE_USER_LEAGUES, RECEIVE_STORED_LEAGUE } from '../actions/league-actions';
const leagueReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_LEAGUE:
            return merge({}, state, action.data);
        case RECEIVE_USER_LEAGUES:
            return merge({}, state, action.userLeagues.data);
        case RECEIVE_STORED_LEAGUE:
            return merge({}, state, action.data);
        default:
            return state;
    }

}

export default leagueReducer;