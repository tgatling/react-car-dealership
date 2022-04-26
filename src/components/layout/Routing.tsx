import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../../pages/Auth';

import Home from '../../pages/Home';
import UserCars from '../../pages/UserCars';
import { RootStateOrAny, useSelector } from 'react-redux';
import NotFound from '../../pages/NotFound';
import AddCar from '../../pages/AddCar';
import EditCar from '../../pages/EditCar';
import ViewCar from '../../pages/ViewCar';
import {
  ADD_DEALER_CAR,
  EDIT_OUR_LOT,
  VIEW_YOUR_CARS,
  HOME_PAGE,
  LOGIN_REGISTER,
  EDIT_SPECIFIC_CAR,
  VIEW_SPECIFIC_CAR,
  PAYMENT_HISTORY,
  CUSTOMER_OFFERS,
  OFFER_HISTORY,
  CUSTOMER_PAYMENTS,
} from '../../models/constants';
import OfferHistory from '../../pages/OfferHistory';
import PaymentHistory from '../../pages/PaymentHistory';
import CustomerOffers from '../../pages/CustomerOffers';
import { SETTINGS } from '../../models/constants';
import Settings from '../../pages/Settings';
import CustomerPayments from '../../pages/CustomerPayments';

const Routing = () => {
  const loggedIn: boolean = useSelector(
    (state: RootStateOrAny) => state.user.isLoggedIn
  );

  return (
    <Switch>
      <Route path={HOME_PAGE} exact>
        <Home editMode={false} />
      </Route>

      <Route path={VIEW_SPECIFIC_CAR} exact>
        {loggedIn ? <ViewCar /> : <Redirect to={LOGIN_REGISTER} />}
      </Route>
      <Route path={VIEW_YOUR_CARS}>
        {loggedIn ? <UserCars /> : <Redirect to={LOGIN_REGISTER} />}
      </Route>
      {loggedIn && (
        <Route path={EDIT_OUR_LOT} exact>
          <Home editMode={true} />
        </Route>
      )}
      {loggedIn && (
        <Route path={EDIT_SPECIFIC_CAR}>
          <EditCar />
        </Route>
      )}
      {loggedIn && (
        <Route path={ADD_DEALER_CAR}>
          <AddCar />
        </Route>
      )}
      {loggedIn && (
        <Route path={OFFER_HISTORY}>
          <OfferHistory />
        </Route>
      )}
      {loggedIn && (
        <Route path={CUSTOMER_OFFERS}>
          <CustomerOffers />
        </Route>
      )}
      {loggedIn && (
        <Route path={CUSTOMER_PAYMENTS}>
          <CustomerPayments />
        </Route>
      )}
      {loggedIn && (
        <Route path={PAYMENT_HISTORY}>
          <PaymentHistory />
        </Route>
      )}
      {!loggedIn && (
        <Route path={LOGIN_REGISTER}>
          <Auth />
        </Route>
      )}
      {loggedIn && (
        <Route path={SETTINGS}>
          <Settings />
        </Route>
      )}
      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routing;
