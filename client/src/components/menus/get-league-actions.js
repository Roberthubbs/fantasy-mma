import React, { useState } from 'react';
import UserLeagues from '../league/user-leagues-container';
import YourRoster from '../roster/your-roster-container';
import { BrowserRouter as  Link } from 'react-router-dom';


function GetLeagueActions(props)  {


    let [user] = useState(props.user)

    if (props.currLeagueId !== 'no league' && user) {

        console.log('In League ID exists: ', props.currLeagueId)

        return (
            <div>
                <Link to={`/notifications`} className='general-link-class'>Your Notifications</Link>
                <br />
                <Link to={`/free-agents/${props.currLeagueId}`} className='general-link-class'>Free Agents</Link>
                <br />
                <Link to={`/league-auction/${props.currLeagueId}`} className='general-link-class'>Current Auction</Link>
                <UserLeagues userId={user} sendLeague={props.changeLeague} />

                <YourRoster leagueId={props.currLeagueId} playerId={user} />
            </div>
        )
    } else if (props.currLeagueId === 'no league' && user) {

        console.log('In League ID exists: ', props.currLeagueId)

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
            <div></div>
        )
    }
}

export default GetLeagueActions;