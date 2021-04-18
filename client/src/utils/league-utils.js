import axios from 'axios';
const allHeaders = {
    "Access-Control-Allow-Origin": "*"
};

export const addLeague = async(leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal) => {
    //debugger;
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