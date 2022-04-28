import React, { useEffect, useState } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import offerService from '../services/offer.service';
import CarTable from '../components/car/CarTable';

import { VIEW_YOUR_CARS } from '../models/constants';
import { offerActions } from '../store/offer-slice';

const UserCars = () => {
  const carState = useSelector((state: RootStateOrAny) => state.car);
  const currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );
  const [userId, setUserId] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      let user = JSON.parse(currentUser);
      setUserId(user.userId);
    }

    if (location.pathname === VIEW_YOUR_CARS) {
      let carOffers: { carId: string; offerId: string; status: string }[] = [];
      offerService
        .getAllOffers()
        .then((response) => {
          for (const key in response) {
            carOffers.push({
              carId: response[key].carId,
              offerId: response[key].offerId,
              status: response[key].status,
            });
          }
          dispatch(offerActions.setCarOffers(carOffers));
        })
        .catch((error) => error);
    }
  }, [carState, currentUser, location.pathname, dispatch]);

  return (
    <div>
      <CarTable editMode={false} cars={carState.cars} owner={userId} />
    </div>
  );
};

export default UserCars;
