import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Switch>
      <Route path='/' exact>
        <Home/>
      </Route>
    </Switch>
  );
}

export default App;
