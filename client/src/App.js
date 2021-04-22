import logo from './logo.svg';
import './App.css';
import React, { useContext, useReducer } from "react";
//import leagueReducer from './reducers/league-reducer';
import GetLeague from './components/league/get-league-container';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Fighters from './components/fighters/all-fighters-container';
import FreeAgents from './components/fighters/free-agent-container';
import LoginContainer from './components/login-container';
import RegisterContainer from './components/sign-up-container';
import CreateLeague from './components/league/create-league-container';
import LeagueAuction from './components/league/league-action-container';
import JoinLeagueRequest from './components/league/join-league-container';
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
  console.log('app props', props);
  const getLeagueActions = () => {

    console.log(props, 'app props')
    if (props.leagueId){
      

      return (
        <div>
          <Link to={`/free-agents/${props.leagueId}`} className='general-link-class'>Free Agents</Link>
        </div>
      )
    } else if (!props.leagueId && props.user) {
      return (
        <div>
          <Link to="/create-league" className='general-link-class'>Create League</Link>
          <Link to="/join-league" className='general-link-class'>Join League</Link>
          <GetLeague />
        </div>
      )
    }
  }
  return (
    <div className="App">
      
        <div>
          
            <header className="app-header">             
            
                {getLinksMenu()}
                {getLeagueActions()}
              <Link to="/all" className='general-link-class'>All Fighters</Link>
            </header>
       
          </div>
          <div>
          <Switch>
            <Route path='/all' component={Fighters} /> 
            <Route path='/free-agents/:leagueId' component={FreeAgents} />
            <Route path='/create-league' component={CreateLeague} />
            <Route path='/join-league' component={JoinLeagueRequest} />

            <Route path='/league-auction/:leagueId' component={LeagueAuction}/>
            <AuthRoute exact path="/register" component={RegisterContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
          </Switch>
          </div>
        
      
    </div>
  );
}

export default App;
