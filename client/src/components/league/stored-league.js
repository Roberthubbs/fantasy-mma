import React, { useState } from 'react';
const StoredLeague = (props) => {
    const [leagueName, setLeagueName] = useState('');
    const [leagueId, setLeagueId] = useState('');
    const [fetched, fetch] = useState(false);
    const fetchLeague = () => {
        fetch(!fetched)
        props.getStored(props.teamId).then((res) => {
            props.receiveLeague(res.data.id);
            
        });
    }
    if (!leagueName && !fetched){
        
        fetchLeague();
    }
    if (!leagueName){
        return (
            <div></div>
        )
    }
    return (
        {leagueId}
    )
}
export default StoredLeague;