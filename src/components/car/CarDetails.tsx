import React, { useState } from 'react';

import PaymentTable from '../system/payments/PaymentTable';
import { Car } from '../../models/car';
import { CUSTOMER_ROLE } from '../../models/constants';
import styles from './CarDetails.module.css';
import OfferDetails from '../system/offers/OfferDetails';
import { mockPaymentHistory } from '../../tests/mockData/mockPaymentHistory';

interface detailsProp {
  car: Car;
  ownerRole: string;
}

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
            <PaymentTable payments={mockPaymentHistory} />
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
