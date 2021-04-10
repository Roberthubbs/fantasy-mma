import * as LeagueUtils from '../utils/league-utils';

export const RECEIVE_LEAGUE = "RECEIVE_LEAGUE";
export const RECEIVE_LEAGUE_ERROR = "RECEIVE_LEAGUE_ERROR";
export const receiveLeague = datum => {
    //debugger;
    let {data} = datum
    return {
    
        type: RECEIVE_LEAGUE,
        data
}}

export const receiveErrors = errors => ({
    type: RECEIVE_LEAGUE_ERROR,
    errors
});

export const createLeague = (leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal) => dispatch =>(
    LeagueUtils.addLeague(leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal).then((league) => (
        dispatch(receiveLeague(league))
    ), err => (
        dispatch(receiveErrors(err))
    ))
);

