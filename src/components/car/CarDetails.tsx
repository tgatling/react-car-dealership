import React from 'react';

import PaymentTable from '../system/payments/PaymentTable';
import { Car } from '../../models/car';
import { CUSTOMER_ROLE } from '../../models/constants';
import styles from './CarDetails.module.css';
import { Payments } from '../../models/payments';
import OfferDetails from '../system/offers/OfferDetails';

interface detailsProp {
  car: Car;
  ownerRole: string;
}

// TODO: REMOVE HARDCODED PAYMENT INFORMATION

const DUMMY_PAYMENTS: Payments = {
  carId: '-MwlR-FOe4z_HTtcCI2e',
  totalAmount: 11300,
  downPayment: 3300,
  numberOfPayments: 15,
  paymentsMade: 3,
};

const CarDetails = ({ car, ownerRole }: detailsProp) => {
  let carName = `${car.year} ${car.make} ${car.model}`.toUpperCase();

  return (
    <div className={styles.section}>
      {car.url && <img src={car.url} alt='' />}
      <div className={styles.card}>
        {ownerRole === CUSTOMER_ROLE ? (
          <div>
            <h1>{`MAKE A PAYMENT ON YOUR ${carName}`}</h1>
            <PaymentTable
              carId={DUMMY_PAYMENTS.carId}
              totalAmount={DUMMY_PAYMENTS.totalAmount}
              downPayment={DUMMY_PAYMENTS.downPayment}
              numberOfPayments={DUMMY_PAYMENTS.numberOfPayments}
              paymentsMade={DUMMY_PAYMENTS.paymentsMade}
            />
          </div>
        ) : (
          <div>
            <h1>{`MAKE AN OFFER ON OUR ${carName} TODAY!`}</h1>
            <OfferDetails carTotal={car.price} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
