import React, { useEffect, useState } from 'react';

import PaymentTable from '../system/payments/PaymentTable';
import { Car } from '../../models/car';
import { CUSTOMER_ROLE } from '../../models/constants';
import styles from './CarDetails.module.css';
import OfferDetails from '../system/offers/OfferDetails';
import offerService from '../../services/offer.service';
import { ACCEPTED_STATUS, Offer } from '../../models/offer';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';

interface detailsProp {
  car: Car;
  ownerRole: string;
}

const CarDetails = ({ car, ownerRole }: detailsProp) => {
  const [showHeading, setShowHeading] = useState(true);
  const [offer, setOffer] = useState<Offer | null>(null);
  let carName = `${car.year} ${car.make} ${car.model}`.toUpperCase();
  const dispatch = useDispatch();
  const carOffers = useSelector(
    (state: RootStateOrAny) => state.offer.carOffers
  );

  useEffect(() => {
    offerService.getAllOffers().then((response) => {
      for (const key in response) {
        if (
          response[key].carId === car.carId &&
          response[key].status === ACCEPTED_STATUS
        ) {
          setOffer(response[key]);
        }
      }
    });
  }, [car.carId, carOffers, dispatch]);

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
