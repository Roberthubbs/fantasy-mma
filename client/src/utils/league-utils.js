import axios from 'axios';
const allHeaders = {
    "Access-Control-Allow-Origin": "*"
};

export const addLeague = async(leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal) => {
    ////debugger;
    return await axios.request('/create-league', {
        method: "post",
        data: {
            leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal
        },
        headers: allHeaders
    })
}

export const fetchBids = async(leagueId) => {
    return await axios.request(`/league-auction/${leagueId}`, {
        method: "post",
        headers: allHeaders
    })
}

export const getLeague = async(userId, leagueName) => {
    return await axios.request(`/league-auction/${userId}&leagueName=${leagueName}`, {
        method: "get",
        headers: allHeaders
    })
};

export const sendLeagueJoinRequest = async(userId, leagueName, leagueId, adminId, requestMessage) => {
    return axios.request(`/join-league`, {
        method: "post",
        headers: allHeaders,
        data: {
            userId, leagueName, leagueId, adminId, requestMessage
        }
    })
}

export const userLeaguesSelection = async(userId) => {
    return axios.request(`/user/leagues/${userId}`, {
        method: "get",
        headers: allHeaders
    })
}