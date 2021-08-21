import * as FighterUtils from '../utils/fighter-utils';
import * as AuctionActions from './auction-actions';
export const RECEIVE_ALL_FIGHTERS = "RECEIVE_ALL_FIGHTERS";
export const RECEIVE_ALL_FREE_AGENTS = "RECEIVE_ALL_FREE_AGENTS";
export const ADD_FREE_AGENTS = "ADD_FREE_AGENTS";
export const ADD_FIGHTER = "ADD_FIGHTER";

export const receiveAllFighters = fighters => ({
    type: 'RECEIVE_ALL_FIGHTERS',
    fighters
});

export const receiveAllFreeAgents = fighters => ({
    type: 'RECEIVE_ALL_FREE_AGENTS',
    fighters
});
export const receiveFighter = fighter => ({
    type: 'RECEIVE_FIGHTER',
    fighter
})
export const addFreeAgents = (fighterId, teamId, leagueId, cost) => ({
    type: 'ADD_FREE_AGENTS',
    fighterId,
    teamId, 
    leagueId, 
    cost
});


export const fetchAllFighters = (selectedWeightClass) => dispatch => (
    FighterUtils.receiveAll(selectedWeightClass).then((fighters) => {
        dispatch(receiveAllFighters(fighters));
    })
);

export const fetchAllFreeAgents = (leagueId, weightClass) => dispatch => (
    FighterUtils.receiveAllFreeAgents(leagueId, weightClass).then((fighters) => {
        dispatch(receiveAllFreeAgents(fighters));
    })
);

export const addToRoster = (fighterId, leagueId, teamId, cost) => dispatch => (
    FighterUtils.addFreeAgents(fighterId, leagueId, teamId, cost).then((fighters) => {
        dispatch(AuctionActions.fetchAllBids(fighters));
    })
);

export const fightersPage = (id) => dispatch => (
    FighterUtils.getFightersStats(id).then((fighter) => {
        dispatch(receiveFighter(fighter))
    })
);