import axios from 'axios';
const allHeaders = {
    "Access-Control-Allow-Origin": "*"
};
export const receiveAll = async (selectedWeightClass) => {
    return await axios.request('/all', {
        data: {
            selectedWeightClass
        },
        method: "post",
        headers: allHeaders
    });
}

export const receiveAllFreeAgents = async(leagueId, weightClass) => {
    
    return await axios.request(`/free-agents/${leagueId}`,{
        headers: allHeaders,
        method: "post",
        data: {weightClass}
    });
}

export const addFreeAgents = async(fighterId, leagueId, teamId, cost) => {
    return await axios.request(`/add-fighter/${fighterId}/${teamId}/${leagueId}`, {
        method: "post",
        data: {
            cost
        },
        headers: allHeaders
    })
};

export const getFightersStats = async(id) => {
    return await axios.request(`/fighter/cumulative-stats/${id}`, {
        method: "post",
        headers: allHeaders
    })
}