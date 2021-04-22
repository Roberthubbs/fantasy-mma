import React, { useState } from 'react';
const GetLeague = (props) => {
    const [leagueName, setLeagueName] = useState('');
    const [leagueId, setLeagueId] = useState('');

    const fetchLeague = () => {
        props.getLeague(props.teamId, leagueName);
    }
    return (
        <div>
            <input 
               
            
            type="text"
            placeholder={'League Name'}
            value={leagueName}
            onChange={event => setLeagueName(event.target.value)}
            className="bid-input" />
                                
            <button onClick={fetchLeague}>Connect To League</button>
        </div>
    )
}
export default GetLeague;