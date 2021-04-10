import * as FighterUtils from '../utils/fighter-utils';

export const RECEIVE_ALL_FIGHTERS = "RECEIVE_ALL_FIGHTERS";
export const RECEIVE_ALL_FREE_AGENTS = "RECEIVE_ALL_FREE_AGENTS";
export const ADD_FREE_AGENTS = "ADD_FREE_AGENTS";
export const receiveAllFighters = fighters => ({
    type: 'RECEIVE_ALL_FIGHTERS',
    fighters
});

export const receiveAllFreeAgents = fighters => ({
    type: 'RECEIVE_ALL_FREE_AGENTS',
    fighters
});

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

export const fetchAllFreeAgents = (leagueId) => dispatch => (
    FighterUtils.receiveAllFreeAgents(leagueId).then((fighters) => {
        dispatch(receiveAllFreeAgents(fighters));
    })
);

export const addToRoster = (fighterId, teamId, leagueId, cost) => dispatch => (
    FighterUtils.addFreeAgents(fighterId, teamId, leagueId, cost).then((fighters) => {
        dispatch(receiveAllFighters(fighters));
    })
)