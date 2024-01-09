import './App.css';

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import { AppContextProvider } from './contexts/AppContext/AppContext';

import Home from './pages/Home/Home';
import CallRoom from './pages/CallRoom/CallRoom';

function App() {
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  return (
    <div className="App">
      <BrowserRouter>
        <AppContextProvider>
          <Switch>
            <Route
              exact
              path="/:id"
              render={({ match }) => {
                if (!/^[a-z]{4}-[a-z]{4}$/.test(match.params.id)) {
                  return <Home />;
                }
                
                return <CallRoom />;
              }}
            />

            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </AppContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
