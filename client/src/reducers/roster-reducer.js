import merge from 'lodash/merge';
import { RECEIVE_YOUR_ROSTER } from '../actions/roster-actions';
const rosterReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_YOUR_ROSTER:
            return merge({}, state, action.data);
        default:
            return state;
    }

}

export default rosterReducer;