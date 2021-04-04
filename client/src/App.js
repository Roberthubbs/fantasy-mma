import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Fighters from './components/fighters/all-fighters-container';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <switch>
            <Route path='/all' component={Fighters} /> 
          </switch>
        </div>
      </header>
    </div>
  );
}

export default App;
