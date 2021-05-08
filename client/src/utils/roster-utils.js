import axios from 'axios';
const allHeaders = {
    "Access-Control-Allow-Origin": "*"
};

export const yourRoster = async (leagueId, playerId) => {
    return await axios.request(`/current-roster/${leagueId}&teamId=${playerId}`, {
        method: 'get',
        headers: allHeaders
    })
}