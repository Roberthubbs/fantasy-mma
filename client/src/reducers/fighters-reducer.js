import merge from 'lodash/merge';
import { RECEIVE_ALL_FIGHTERS } from '../actions/fighter-actions';
const fightersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type){
        case RECEIVE_ALL_FIGHTERS:
            return merge({}, action.fighters.data);

        default:
            return state;
    }

}

export default fightersReducer;