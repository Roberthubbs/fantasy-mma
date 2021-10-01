import merge from 'lodash/merge';
import { RECEIVE_RECENT_FIGHTS } from '../actions/roster-actions';
const fightsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_RECENT_FIGHTS:
            return merge({}, state, action.fights.data);
        default:
            return state;
    }

}

export default fightsReducer;