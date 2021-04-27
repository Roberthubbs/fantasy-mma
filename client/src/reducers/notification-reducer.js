import merge from 'lodash/merge';
import { RECEIVE_NOTIFICATIONS } from '../actions/notification-actions';
const leagueReducer = (state = {}, action) => {
    Object.freeze(state);
    console.log('inside reducer')
    console.log(action);
    switch (action.type) {
        case RECEIVE_NOTIFICATIONS:
            //debugger;
            return merge({}, state, action.data);
        default:
            return state;
    }

}

export default leagueReducer;