import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../../pages/Auth';

import Home from '../../pages/Home';
import UserCars from '../../pages/UserCars';
import { RootStateOrAny, useSelector } from 'react-redux';
import NotFound from '../../pages/NotFound';
import AddCar from '../../pages/AddCar';
import EditCar from '../../pages/EditCar';
import ViewCar from '../../pages/ViewCar';

const Routing = () => {
  const loggedIn: boolean = useSelector(
    (state: RootStateOrAny) => state.user.isLoggedIn
  );

  return (
    <Switch>
      <Route path='/' exact>
        <Home editMode={false} />
      </Route>
      {loggedIn && (
        <Route path='/car/:carId' exact>
          <ViewCar />
        </Route>
      )}
      {loggedIn && (
        <Route path='/my-cars'>
          <UserCars />
        </Route>
      )}
      {loggedIn && (
        <Route path='/edit-dealers-cars' exact>
          <Home editMode={true} />
        </Route>
      )}
      {loggedIn && (
        <Route path='/edit-dealers-cars/:carId'>
          <EditCar />
        </Route>
      )}
      {loggedIn && (
        <Route path='/add-to-dealers-cars'>
          <AddCar />
        </Route>
      )}
      {!loggedIn && (
        <Route path='/login'>
          <Auth />
        </Route>
      )}
      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routing;
