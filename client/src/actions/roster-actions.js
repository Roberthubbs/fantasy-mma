import * as RosterUtil from '../utils/roster-utils.js'
export const RECEIVE_YOUR_ROSTER = "RECEIVE_YOUR_ROSTER";
export const RECEIVE_RECENT_FIGHTS = "RECEIVE_RECENT_FIGHTS";

export const receiveYourRoster = (roster) => ({
    type: RECEIVE_YOUR_ROSTER,
    roster
});

export const receiveRecentFights = (fights) => ({
    type: RECEIVE_RECENT_FIGHTS,
    fights
})

export const findYourRoster = (leagueId, playerId) => dispatch => (
    RosterUtil.yourRoster(leagueId, playerId).then((roster) => (
        dispatch(receiveYourRoster(roster))
    ))
)

export const getRecentFights = () => dispatch => (
    RosterUtil.recentFights().then((fights) => (
        dispatch(receiveRecentFights(fights))
    ))
)