import React, { useState } from 'react';

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
  userId: 'dummy-user-id',
  carId: '-MwlR-FOe4z_HTtcCI2e',
  totalAmount: 11300,
  downPayment: 3300,
  numberOfPayments: 15,
  paymentsMade: 3,
};

const CarDetails = ({ car, ownerRole }: detailsProp) => {
  const [showHeading, setShowHeading] = useState(true);
  let carName = `${car.year} ${car.make} ${car.model}`.toUpperCase();

  return (
    <div className={styles.section}>
      {car.url && <img src={car.url} alt='' />}
      <div className={styles.card}>
        {ownerRole === CUSTOMER_ROLE ? (
          <div>
            <h1>{`MAKE A PAYMENT ON YOUR ${carName}`}</h1>
            <PaymentTable
              userId={DUMMY_PAYMENTS.userId}
              carId={DUMMY_PAYMENTS.carId}
              totalAmount={DUMMY_PAYMENTS.totalAmount}
              downPayment={DUMMY_PAYMENTS.downPayment}
              numberOfPayments={DUMMY_PAYMENTS.numberOfPayments}
              paymentsMade={DUMMY_PAYMENTS.paymentsMade}
            />
          </div>
        ) : (
          <div>
            {showHeading && <h1>{`MAKE AN OFFER ON OUR ${carName} TODAY!`}</h1>}
            <OfferDetails carTotal={car.price} showHeading={setShowHeading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
