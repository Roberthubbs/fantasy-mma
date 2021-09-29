import * as LeagueUtils from '../utils/league-utils';

export const RECEIVE_LEAGUE = "RECEIVE_LEAGUE";
export const RECEIVE_LEAGUE_ERROR = "RECEIVE_LEAGUE_ERROR";
export const RECEIVE_USER_LEAGUES = "RECEIVE_USER_LEAGUES";
export const RECEIVE_STORED_LEAGUE = "RECEIVE_STORED_LEAGUE";
export const RECEIVE_LEAGUE_HOME_PLAYERS = "RECEIVE_LEAGUE_HOME_PLAYERS";

export const receiveLeague = datum => {
    let {data} = datum
    return {
    
        type: RECEIVE_LEAGUE,
        data
}};

export const receiveStoredLeague = datum => {
    let { data } = datum;
    return {
        type: RECEIVE_STORED_LEAGUE,
        data
    }
}


export const receiveUsersLeagues = userLeagues => ({
    type: RECEIVE_USER_LEAGUES,
    userLeagues
})

export const receiveErrors = errors => ({
    type: RECEIVE_LEAGUE_ERROR,
    errors
});

export const receiveLeagueHomePlayers = players => ({
    type: RECEIVE_LEAGUE_HOME_PLAYERS,
    players
});

export const createLeague = (leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal) => dispatch =>(
    LeagueUtils.addLeague(leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal).then((league) => (
        dispatch(receiveLeague(league))
    ), err => (
        dispatch(receiveErrors(err))
    ))
);

export const getLeague = (userId, leagueName) => dispatch => (
    LeagueUtils.getLeague(userId, leagueName).then((league) => {
        dispatch(receiveLeague(league), err => (
            dispatch(receiveErrors(err))
        ))
    })
);
export const gSL = (teamId) => dispatch => (
    LeagueUtils.getStoredLeague(teamId).then((league) => (
        dispatch(receiveLeague (league), err => (
            dispatch(receiveErrors(err))
        ))
    ))
)

export const asl = (teamId, leagueId) => dispatch => (
    LeagueUtils.addStoredLeague(teamId, leagueId)
)
export const slr = (userId, leagueName, leagueId, teamId, requestMessage) => dispatch => (
    LeagueUtils.sendLeagueJoinRequest(userId, leagueName, leagueId, teamId, requestMessage)
)

export const getAllUserLeagues = (userId) => dispatch => (
    LeagueUtils.userLeaguesSelection(userId).then((leagues) => (
        dispatch(receiveUsersLeagues(leagues), err => (
            dispatch(receiveErrors(err))
        ))
    ))
);

export const getLeaguePlayers = (leagueId) => dispatch => (
    LeagueUtils.getLeagueData(leagueId).then((res) => (
        dispatch(receiveLeagueHomePlayers(res), err => (
            dispatch(receiveErrors(err))
        ))
    ))
)