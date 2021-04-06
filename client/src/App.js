import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Fighters from './components/fighters/all-fighters-container';
import LoginContainer from './components/login-container';
import RegisterContainer from './components/sign-up-container';

import { AuthRoute } from './utils/route-util';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div>
            <header>
              
            </header>

          </div>
          <Switch>
            <Route path='/all' component={Fighters} /> 
            <AuthRoute exact path="/register" component={RegisterContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
          </Switch>
        </div>
      </header>
    </div>
  );
}

export default App;
