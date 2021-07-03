import './App.css';

import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";

import { AppContextProvider } from './contexts/AppContext/AppContext';

import Home from './pages/Home/Home';
import CallRoom from './pages/CallRoom/CallRoom';

function App() {
  return (
    <div className="App">
      <HashRouter hashType={ 'noslash' }>
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
      </HashRouter>
    </div>
  );
}

export default App;
