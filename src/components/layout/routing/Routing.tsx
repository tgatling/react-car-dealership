import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';

import CustomerPayments from '../../../pages/navigationBar/CustomerPayments';
import PaymentHistory from '../../../pages/userBar/PaymentHistory';
import CustomerOffers from '../../../pages/navigationBar/CustomerOffers';
import OfferHistory from '../../../pages/userBar/OfferHistory';
import UserCars from '../../../pages/userBar/UserCars';
import NotFound from '../../../pages/other/NotFound';
import Settings from '../../../pages/userBar/Settings';
import EditCar from '../../../pages/navigationBar/EditCar';
import ViewCar from '../../car/ViewCar';
import AddCar from '../../car/AddCar';
import Auth from '../../../pages/navigationBar/Auth';
import Home from '../../../pages/navigationBar/Home';
import BillDisplay from '../../bills/BillDisplay';

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
  SETTINGS,
  USER_PAYMENTS,
  VIEW_PAYMENTS,
} from '../../../models/constants';
import ViewPayments from '../../payments/ViewPayments';

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
        <Route path={PAYMENT_HISTORY}>
          <PaymentHistory />
        </Route>
      )}
      {loggedIn && (
        <Route path={CUSTOMER_PAYMENTS} exact>
          <CustomerPayments />
        </Route>
      )}
      {loggedIn && (
        <Route path={USER_PAYMENTS}>
          <BillDisplay />
        </Route>
      )}
      {loggedIn && (
        <Route path={VIEW_PAYMENTS}>
          <ViewPayments />
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
