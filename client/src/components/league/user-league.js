import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const UserLeagues = (props) => {
    let [clicked, click] = useState(false);
    let [fetched, fetch] = useState(false);
    let [leagues, changeLeagues] = useState([])
    const fetchLeagues = () => {
        if (!fetched && !leagues.length) {
            fetch(!fetched)
            props.getAllUserLeagues(props.userId).then((res) => {
                changeLeagues(res.userLeagues.data)
            });
        }
    }
    const clickLeagues = () => {
        click(!clicked);
    }

    if (!leagues.length && !fetched) {
        fetchLeagues();
    }

    if (!clicked) {
        return (
            <ul className='your-leagues-list'>

                <li className='leagues-li-top'><button onClick={clickLeagues} className='your-leagues-btn'>Your Leagues</button></li>
            </ul>

        )
    } else {
        return (
            <ul className='your-leagues-list'>
                <li className='leagues-li-top'><button onClick={clickLeagues} className='your-leagues-btn'>Your Leagues</button></li>
                {leagues.map((league) => (
                    <li className='leagues-li' onClick={(() => props.sendLeague(league.leagueId))}><button className='your-leagues-list-btn' >{league.leagueName}</button></li>
                ))}
                <li className='your-leagues-list-btn'><Link to={`/join-league`} className='general-link-class'>Join A League</Link></li>
            </ul>
        )
    }
}

export default UserLeagues
