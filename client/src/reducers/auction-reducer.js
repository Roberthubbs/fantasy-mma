import merge from 'lodash/merge';
import { RECEIVE_ALL_BIDS } from '../actions/auction-actions';
const auctionReducer = (state = {}, action) => {
    Object.freeze(state);
    
    switch (action.type) {
        case RECEIVE_ALL_BIDS:
            return merge({}, action.bids.data);
        default:
            return state;
    }

}

export default auctionReducer;