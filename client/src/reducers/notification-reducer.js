import merge from 'lodash/merge';
import { RECEIVE_NOTIFICATIONS } from '../actions/notification-actions';
const leagueReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_NOTIFICATIONS:
            //debugger;
            return merge({}, state, action.data);
        default:
            return state;
    }

}

export default leagueReducer;