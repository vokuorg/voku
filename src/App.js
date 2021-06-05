import './App.css';

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Home from './pages/Home/Home';
import CallRoom from './pages/CallRoom/CallRoom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/call">
            <CallRoom />
          </Route>

          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
