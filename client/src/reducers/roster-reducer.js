import merge from 'lodash/merge';
import { RECEIVE_YOUR_ROSTER } from '../actions/roster-actions';
const rosterReducer = (state = {}, action) => {
    Object.freeze(state);
    console.log('inside roster reducer')
    console.log(action);
    switch (action.type) {
        case RECEIVE_YOUR_ROSTER:
            //debugger;
            return merge({}, state, action.data);
        default:
            return state;
    }

}

export default rosterReducer;