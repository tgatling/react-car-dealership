import React, { useEffect, useState } from 'react';

import PaymentTable from '../system/payments/PaymentTable';
import { Car } from '../../models/car';
import { CUSTOMER_ROLE } from '../../models/constants';
import styles from './CarDetails.module.css';
import OfferDetails from '../system/offers/OfferDetails';
import offerService from '../../services/offer.service';
import { Offer } from '../../models/offer';

interface detailsProp {
  car: Car;
  ownerRole: string;
}

const CarDetails = ({ car, ownerRole }: detailsProp) => {
  const [showHeading, setShowHeading] = useState(true);
  const [offer, setOffer] = useState<Offer | null>(null);
  let carName = `${car.year} ${car.make} ${car.model}`.toUpperCase();

  useEffect(() => {}, []);

  return (
    <div className={styles.section}>
      {car.url && <img src={car.url} alt='' />}
      <div className={styles.card}>
        {ownerRole === CUSTOMER_ROLE ? (
          <div>
            <h1>{`MAKE A PAYMENT ON YOUR ${carName}`}</h1>
            {offer && <PaymentTable offer={offer} />}
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
