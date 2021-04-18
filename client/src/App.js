import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Fighters from './components/fighters/all-fighters-container';
import FreeAgents from './components/fighters/free-agent-container';
import LoginContainer from './components/login-container';
import RegisterContainer from './components/sign-up-container';
import CreateLeague from './components/league/create-league-container';
import LeagueAuction from './components/league/league-action-container';
import { AuthRoute } from './utils/route-util';
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
  const getLeagueActions = () => {
    if (props.league){
      return (
        <div>
          <Link to={`/free-agents/${props.league}`}>Free Agents</Link>
        </div>
      )
    } else if (!props.league && props.user) {
      return (
        <div>
          <Link to="/create-league">Create League</Link>
          <Link to="/join-league">Join League</Link>
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
              <Link to="/all">All Fighters</Link>
            </header>
       
          </div>
          <div>
          <Switch>
            <Route path='/all' component={Fighters} /> 
            <Route path='/free-agents/:leagueId' component={FreeAgents} />
            <Route path='/create-league' component={CreateLeague} />
            <Route path='/league-auction/:leagueId' component={LeagueAuction}/>
            <AuthRoute exact path="/register" component={RegisterContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
          </Switch>
          </div>
        
      
    </div>
  );
}

export default App;
