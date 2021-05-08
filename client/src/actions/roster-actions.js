import * as RosterUtil from '../utils/roster-utils.js'
export const RECEIVE_YOUR_ROSTER = "RECEIVE_YOUR_ROSTER";

export const receiveYourRoster = (roster) => ({
    type: RECEIVE_YOUR_ROSTER,
    roster
});


export const findYourRoster = (leagueId, playerId) => dispatch => (
    RosterUtil.yourRoster(leagueId, playerId).then((roster) => (
        dispatch(receiveYourRoster(roster))
    ))
)