import React, { useState } from 'react';
import Logout from '../user/logout-button-container';
import UserLeagues from '../league/user-leagues-container';
import YourRoster from '../roster/your-roster-container';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function GetLinksMenu(props){
    console.log(props, "props in App");
    let [refresh, refreshed] = useState(false);
    let [user, setUser] = useState(props.user)
    function refreshIt() {
        //const [refresh, refreshed] = useState(0);
        return () => refreshed(refresh => refresh + 1)
    }
   
    if (user && props.currentLeagueId != 'no league') {
        return (
            <div >
                <button onClick={() => (setUser(null))}><Logout user={props.user} /></button>
                <div>
                <Link to={`/notifications`} className='general-link-class'>Your Notifications</Link>
                <br />
                <Link to={`/free-agents/${props.currLeagueId}`} className='general-link-class'>Free Agents</Link>
                <br />
                <Link to={`/league-auction/${props.currLeagueId}`} className='general-link-class'>Current Auction</Link>
                <UserLeagues userId={user} sendLeague={props.changeLeague} />

                <YourRoster leagueId={props.currLeagueId} playerId={user} />
            </div>
            </div>
        )
    } else if (props.currLeagueId == 'no league' && user) {
        return (
            <div >
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
                <Link to="/register">Sign Up</Link>
                <Link to="/login">Login</Link>
            </div>
        )
    }
}

export default GetLinksMenu

