import logo from './logo.svg';
import './App.css';
import React, { useContext, useReducer, useState } from "react";
//import leagueReducer from './reducers/league-reducer';
//import GetLeague from './components/league/get-league-container';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import GetLinksMenu from './components/menus/get-links-menu-container';
import Fighters from './components/fighters/all-fighters-container';
import FreeAgents from './components/fighters/free-agent-container';
import LoginContainer from './components/login-container';
import RegisterContainer from './components/sign-up-container';
import CreateLeague from './components/league/create-league-container';
import LeagueAuction from './components/league/league-action-container';
import JoinLeagueRequest from './components/league/join-league-container';
import Notifications from './components/notifications/notification-container';
import GetLeagueActions from './components/menus/get-league-actions';
import UserLeagues from './components/league/user-leagues-container';
import YourRoster from './components/roster/your-roster-container';
import Logout from './components/user/logout-button-container';
import { AuthRoute } from './utils/route-util';
import StoredLeague from './components/league/stored-league-container';
import axios from 'axios';
const allHeaders = {
  "Access-Control-Allow-Origin": "*"
};

const addStoredLeague = async (teamId, leagueId) => {
  return await axios.request(`/add-current-league`, {
    method: "post",
    data: { teamId, leagueId },
    headers: allHeaders
  })
}
function App(props) {

  let [showLinks, setLinks] = useState(false);
  let [currLeagueId, setCurrLeague] = useState('no league');
  let [refresh, refreshed] = useState(false)
  
  const changeLeague = async(val) => {
    await addStoredLeague(props.user, val);
    debugger;
    setCurrLeague(val);
    
  };
  const getLeagueId = async(val) => {
    setCurrLeague(val)
  }
  function forceRefresh(val){
    refreshed(!refresh)
  }
  console.log('app props', props);
  
  console.log('state league id global', currLeagueId)
  return (
    <div className="App">
      
       
          
            <header className="app-header">             
              <div className='header-links'>
                <StoredLeague receiveLeague={getLeagueId} />
                
          <GetLinksMenu user={props.user} forceRefresh={forceRefresh} currLeagueId={props.currLeagueId}
            changeLeague={changeLeague}/>
               
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
