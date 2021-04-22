import merge from 'lodash/merge';
import { RECEIVE_ALL_BIDS } from '../actions/auction-actions';
const auctionReducer = (state = {}, action) => {
    Object.freeze(state);
    console.log('inside reducer')
    
    switch (action.type) {
        case RECEIVE_ALL_BIDS:
            //debugger;
            return merge({}, action.bids.data);
        default:
            return state;
    }

}

export default auctionReducer;