import merge from 'lodash/merge';
import { RECEIVE_NOTIFICATIONS } from '../actions/notification-actions';
const notificationReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_NOTIFICATIONS:
            return merge({}, state, action.data);
        default:
            return state;
    }

}

export default notificationReducer;