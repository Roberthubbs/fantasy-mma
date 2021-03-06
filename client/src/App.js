import logo from './logo.svg';
import './App.css';
import React, { useContext, useReducer, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NewsFeed from './components/news/tweets';
import GetLinksMenu from './components/menus/get-links-menu-container';
import Fighters from './components/fighters/all-fighters-container';
import FreeAgents from './components/fighters/free-agent-container';
import LoginContainer from './components/login-container';
import RegisterContainer from './components/sign-up-container';
import CreateLeague from './components/league/create-league-container';
import LeagueAuction from './components/league/league-action-container';
import UserLeagues from './components/league/user-leagues-container';
import SideMenu from './components/menus/side-menu';
import JoinLeagueRequest from './components/league/join-league-container';
import Notifications from './components/notifications/notification-container';
import FighterPage from './components/fighters/fighter-page-container';
import LeagueHomePlayers from './components/league/league-home-container';
import YourRoster from './components/roster/your-roster-container';
import { AuthRoute } from './utils/route-util';
import StoredLeague from './components/league/stored-league-container';
import axios from 'axios';
import RecentFights from './components/fights/recent-fights-container';
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

const getStoredLeague = async (teamId) => {
   return await axios.request(`/get-current-league/${teamId}`, {
        method: "get",
        headers: allHeaders
    })
};
function App(props) {

  let [showLinks, setLinks] = useState(false);
  let [currLeagueId, setCurrLeague] = useState('no league');
  let [refresh, refreshed] = useState(false)
  
  const changeLeague = async(val) => {
    await addStoredLeague(props.user, val);
    setCurrLeague(val);
    
  };
  const getLeagueId = async(val) => {
    setCurrLeague(val)
  }
  function forceRefresh(val){
    refreshed(!refresh)
  }
  getStoredLeague(props.user).then((res) => {
    setCurrLeague(res.data.leagueId)
  })
  return (
    <div className="App">
      
       
    
          <header className="app-header">      

              <div className='header-links'>
              
              <StoredLeague receiveLeague={getLeagueId} />
                    
              <GetLinksMenu user={props.user} forceRefresh={forceRefresh} currLeagueId={currLeagueId}
                changeLeague={changeLeague}/>
                  
              {/* </div>
              <div className='header-links'> */}

              </div>
          </header>

          <div>
            <SideMenu user={props.user} forceRefresh={forceRefresh} currLeagueId={currLeagueId} changeLeague={changeLeague}/>
          </div>
          {/* <div>
              <YourRoster leagueId={currLeagueId} playerId={props.user} />

          </div> */}

          <div className='body-div'>
          <Switch>
            <Route exact path='/' component={RecentFights} /> 
            <Route path='/all' component={Fighters} /> 
            <Route path='/news-feed' component={NewsFeed} /> 
            <Route path='/free-agents/:leagueId' component={FreeAgents} />
            <Route path='/fighter/cumulativestats/:id' component={FighterPage} />
            <Route path='/create-league' component={CreateLeague} />
            <Route path='/join-league' component={JoinLeagueRequest} />
            <Route path='/notifications' component={Notifications} />
            <Route path='/league-home-players' component={LeagueHomePlayers} />
            <Route path='/league-auction/:leagueId' component={LeagueAuction}/>
            <AuthRoute exact path="/register" component={RegisterContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
          </Switch>
          </div>
        
      
    </div>
  );
}

export default App;
