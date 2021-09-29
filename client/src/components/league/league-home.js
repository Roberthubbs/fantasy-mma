import React, { useState } from 'react';
import YourRoster from '../roster/your-roster-container';
export default function LeagueHomePlayers (props) {
    let [players, setPlayers] = useState([]);
    let [fetched, fetch] = useState(false);
    let [mouseOver, moveMouse] = useState(false);
    const fetchPlayers = () => {
        fetch(!fetched);
        props.getLeaguePlayers(props.leagueId).then((res) => {
            setPlayers(res.players.data)
        })
    };

    if (!fetched){
        fetchPlayers()
    }

    const trackMouse = (e) => {

    }

    if (players && players[0]){
        players.forEach((player) => {
            player.mouseOver = false;
        })
        return (
            <div className='outer-league-home-div'>
                {players.map((player, i) => (
                    <div className='flip-card' key={i} >
                        
                        <div className='player-div'>
                            <h3>{player.username}</h3>
                            <p>Player Point Total: {player.pointTotal}</p>
                            <p>Waiver Left: {player.waiverLeft}</p>
                        </div>
                        
                        
                        <div className="roster-div">
                            <YourRoster leagueId={player.leagueId} playerId={player.teamId} />
                            
                        </div>
                    
                    </div>
                ))}

            </div>
        )
    } else {
        return (
            <div>NONE FOUND</div>
        )
    }
}