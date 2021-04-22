import * as LeagueUtils from '../utils/league-utils';
export const RECEIVE_ALL_BIDS = "RECEIVE_ALL_BIDS";

export const receiveCurrentAuction = bids => ({
    type: 'RECEIVE_ALL_BIDS',
    bids
});


export const fetchAllBids = (leagueId) => dispatch => (
    LeagueUtils.fetchBids(leagueId).then((bids) => (
        dispatch(receiveCurrentAuction(bids))
    ))
);