import logo from './logo.svg';
import './App.css';
import React, { useContext, useReducer, useState } from "react";
//import leagueReducer from './reducers/league-reducer';
//import GetLeague from './components/league/get-league-container';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Fighters from './components/fighters/all-fighters-container';
import FreeAgents from './components/fighters/free-agent-container';
import LoginContainer from './components/login-container';
import RegisterContainer from './components/sign-up-container';
import CreateLeague from './components/league/create-league-container';
import LeagueAuction from './components/league/league-action-container';
import JoinLeagueRequest from './components/league/join-league-container';
import Notifications from './components/notifications/notification-container';
import UserLeagues from './components/league/user-leagues-container';
import YourRoster from './components/roster/your-roster-container';
import { AuthRoute } from './utils/route-util';

import leagueReducer from './reducers/league-reducer';
//import React, { Component } from 'react'

// export default class App extends Component {
//   constructor(props){
//     super(props)
//   }
//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   }
// }

function App(props) {
  // if (this.props.user){
  //   return ()
  // }

  let [showLinks, setLinks] = useState(false);
  let [currLeagueId, setCurrLeague] = useState('no league');

  const getLinksMenu = () => {
    
    console.log(props, "props in App");
    if (props.user){
      return null;
    } else {
      return (
        <div>
         <Link to="/register">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      )
    }
  }
  const changeLeague = (val) => {
    setCurrLeague(val);
  }
  console.log('app props', props);
  const getLeagueActions = () => {

    if (currLeagueId != 'no league'){
      
      console.log('In League ID exists: ', currLeagueId)

      return (
        <div>
          <Link to={`/notifications`} className='general-link-class'>Your Notifications</Link>
          <br />
          <Link to={`/free-agents/${currLeagueId}`} className='general-link-class'>Free Agents</Link>
          <br /> 
          <Link to={`/league-auction/${currLeagueId}`} className='general-link-class'>Current Auction</Link>
          <YourRoster leagueId={currLeagueId} playerId={props.user} />
        </div>
      )
    } else if (currLeagueId == 'no league' && props.user) {
      console.log('In League ID exists: ', currLeagueId)

      return (
        <div >
          <Link to="/create-league" className='general-link-class'>Create League</Link>
          <br />

          <Link to="/join-league" className='general-link-class'>Join League</Link>
          <br />

          <UserLeagues userId={props.user} sendLeague={changeLeague} />

        </div>
      )
    }
  }
  console.log('state league id global', currLeagueId)
  return (
    <div className="App">
      
       
          
            <header className="app-header">             
              <div className='header-links'>

                {getLinksMenu()}
                {getLeagueActions()}
              </div>
              <div className='header-links'>
                <Link to="/all" className='general-link-class'>All Fighters</Link>
              </div>
            </header>
       
        
          <div>
          <Switch>
            <Route path='/all' component={Fighters} /> 
            <Route path='/free-agents/:leagueId' component={FreeAgents} />
            <Route path='/create-league' component={CreateLeague} />
            <Route path='/join-league' component={JoinLeagueRequest} />
            <Route path='/notifications' component={Notifications} />
            <Route path='/league-auction/:leagueId' component={LeagueAuction}/>
            <AuthRoute exact path="/register" component={RegisterContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
          </Switch>
          </div>
        
      
    </div>
  );
}

export default App;
