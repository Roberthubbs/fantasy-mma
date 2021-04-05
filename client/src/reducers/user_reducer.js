import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER, RECEIVE_CURRENT_USER_INFO } from '../actions/session-actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);


    switch (action.type) {
        case RECEIVE_CURRENT_USER:

            localStorage.setItem('currentUser', JSON.stringify(action.currentUser.data.user))
            return merge({}, state, { [action.currentUser.data.user.id]: action.currentUser.data.user });
        case RECEIVE_CURRENT_USER_INFO:

            return merge({}, state, { comments: action.payload.data.comments, user: action.payload.data.user })
        default:
            return state;
    }
};


export default usersReducer;