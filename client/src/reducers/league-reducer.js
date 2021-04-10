import merge from 'lodash/merge';
import { RECEIVE_LEAGUE } from '../actions/league-actions';
const leagueReducer = (state = {}, action) => {
    Object.freeze(state);
    console.log('inside reducer')
    console.log(action);
    switch (action.type) {
        case RECEIVE_LEAGUE:
           // debugger;
            return merge({}, state, {[action.data.id]: action.data});
        default:
            return state;
    }

}

export default leagueReducer;