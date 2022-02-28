import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../pages/Home';
import UserCars from '../../pages/UserCars';

const Routing = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/my-cars' exact>
        <UserCars/>
      </Route>
    </Switch>
  );
};

export default Routing;
