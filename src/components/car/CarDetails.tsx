import React from 'react';

import OfferForm from '../system/OfferForm';
import PaymentTable from '../system/PaymentTable';
import { Car } from '../../models/car';
import { CUSTOMER_ROLE } from '../../models/constants';
import styles from './CarDetails.module.css';

interface detailsProp {
  car: Car;
  ownerRole: string;
}

const CarDetails = ({ car, ownerRole }: detailsProp) => {
  let carName = `${car.year} ${car.make} ${car.model}`.toUpperCase();

  return (
    <div className={styles.section}>
      {car.url && <img src={car.url} alt='' />}
      <div className={styles.card}>
        {ownerRole === CUSTOMER_ROLE ? (
          <div>
            <h1>{`MAKE A PAYMENT ON YOUR ${carName}`}</h1>
            <PaymentTable/>
          </div>
        ) : (
          <div>
            <h1>{`MAKE AN OFFER ON OUR ${carName} TODAY!`}</h1>
            <OfferForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
