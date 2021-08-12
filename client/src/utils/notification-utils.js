import axios from 'axios';
const allHeaders = {
    "Access-Control-Allow-Origin": "*"
};

export const getUserNotifs = async(userId) => {
    debugger;
    return await axios.request(`/notifications/${userId}`, {
        method: 'get',
        headers: allHeaders
    });
}


export const respondToLeagueJoin = async(userId, response, requestId, leagueId) => {
    return await axios.request('/respond-league-join', {
        method: 'post',
        headers: allHeaders,
        data: {
            userId, response, requestId
        }
    })
}