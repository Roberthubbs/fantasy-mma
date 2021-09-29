import React, { useState } from 'react';
import Logout from '../user/logout-button-container';
import UserLeagues from '../league/user-leagues-container';
import YourRoster from '../roster/your-roster-container';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function SideMenu(props){
    let [user, setUser] = useState(props.user)

    
    if (user && props.currLeagueId !== 'no league') {
        return (
            <div >
                <div id='roster-league-div'>               
                    <YourRoster leagueId={props.currLeagueId} playerId={user} />
                </div>

            </div>
        )
    }  else {
        return (
            <div></div>
        )
    }
}

export default SideMenu;
