import React, { useEffect, useState } from 'react';
import { Car } from '../../../models/car';
import { Offer } from '../../../models/offer';
import carService from '../../../services/car.service';
import styles from './OfferItem.module.css';

interface itemProps {
  offer: Offer;
}

const OfferItem = ({ offer }: itemProps) => {
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    carService.getCar(offer.carId).then((response) => {
      setCar(response);
    });
  }, [offer.carId]);

  return (
    <div className={styles.itemContainer}>
      <div>
        <img src={car?.url} alt='' />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.headerContainer}>
          <div>
            <h1>{`${car?.year} ${car?.make} ${car?.model} - $${car?.price}`}</h1>
          </div>
          <div>
            <h1>{`STATUS: ${offer.status}`}</h1>
          </div>
        </div>
        <div>
          <p>{offer.offerDate}</p>
          <p>{offer.offerId}</p>
          <p>{offer.carId}</p>
          <p>{offer.carTotal}</p>
          <p>{offer.downPayment}</p>
          <p>{offer.status}</p>
          <p>{offer.numberOfPayments}</p>
        </div>
      </div>
    </div>
  );
};

export default OfferItem;
