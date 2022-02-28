import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../../pages/Auth';

import Home from '../../pages/Home';
import UserCars from '../../pages/UserCars';

const Routing = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/my-cars'>
        <UserCars />
      </Route>
      <Route path='/login'>
        <Auth />
      </Route>
    </Switch>
  );
};

export default Routing;
