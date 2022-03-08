import React, { Fragment, useEffect } from 'react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Routing from './components/layout/Routing';
import { Car } from './models/car';
import carService from './services/car.service';
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import {carActions} from './store/car-slice';

function App() {
  let dispatch = useDispatch();
  let carState = useSelector((state: RootStateOrAny)=> state.cars)

  useEffect(() => {
    carService
      .getCars()
      .then((result) => {
        // convert results to format of car array
        let loadedCars: Car[] = [];
        for (const key in result) {
          loadedCars.push({
            carId: key,
            owner: result[key].owner,
            year: result[key].year,
            make: result[key].make,
            model: result[key].model,
            price: result[key].price,
            url: result[key].url,
          });
        }

        // store all cars in redux car state
        dispatch(carActions.setCars({cars: loadedCars}));
      })
      .catch((error) => error);
  }, [dispatch, carState]);

  return (
    <Fragment>
      <Header />
      <Routing />
      <Footer />
    </Fragment>
  );
}

export default App;
