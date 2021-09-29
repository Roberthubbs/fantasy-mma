import React, { useState } from 'react';
import Logout from '../user/logout-button-container';
import UserLeagues from '../league/user-leagues-container';
import YourRoster from '../roster/your-roster-container';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function GetLinksMenu(props){
    let [user, setUser] = useState(props.user)

    
    if (user && props.currLeagueId !== 'no league') {
        return (
            <div >
                
                <img className='header-icon' src='mma-icon.png' alt=''/> 
                <div id='get-links-div'>
                    <Link to={`/notifications`} className='general-link-class'>Your Notifications</Link>
                    <Link to={`/free-agents/${props.currLeagueId}`} className='general-link-class'>Free Agents</Link>
                    <Link to={`/league-auction/${props.currLeagueId}`} className='general-link-class'>Current Auction</Link>
                    <Link to="/news-feed" className='general-link-class'>#News</Link>
                    <Link to="/all" className='general-link-class'>All Fighters</Link>
                    <Link to={`/league-home-players`} className='general-link-class'>League Home</Link>
                    <UserLeagues userId={user} league={props.currLeagueId} sendLeague={props.changeLeague} />
                    <div onClick={() => (setUser(null))}><Logout user={props.user} /></div>

                </div>  

            </div>
        )
    } else if (props.league === 'no league' && user) {
        return (
            <div id='get-links-div'>
                <Link to="/create-league" className='general-link-class'>Create League</Link>
                <br />

                <Link to="/join-league" className='general-link-class'>Join League</Link>
                <br />
                {/* <StoredLeague /> */}
                <UserLeagues userId={user} sendLeague={props.changeLeague} />

            </div>
        )
    } else {
        return (
            <div>
                <Link to="/register" className='general-link-class'>Sign Up</Link>
                <br />
                <Link to="/login" className='general-link-class'>Login</Link>
            </div>
        )
    }
}

export default GetLinksMenu;

