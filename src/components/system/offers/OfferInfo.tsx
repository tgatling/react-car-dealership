import React from 'react';

import { Car } from '../../../models/car';
import { Offer } from '../../../models/offer';
import styles from './OfferItem.module.css';

interface infoProp {
  offer: Offer;
  car: Car | null;
}

const OfferInfo = ({ offer, car }: infoProp) => {
  let date = '';
  if (offer.offerDate) {
    let offerDate = new Date(offer.offerDate);
    date = `${
      offerDate.getMonth() + 1
    }/${offerDate.getDate()}/${offerDate.getFullYear()}`;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className={styles.imageContainer}>
        <img src={car?.url} alt='' />
        <p>{`STATUS: ${offer.status}`}</p>
      </div>
      <div className={styles.infoContainer}>
        {/* Offer Information */}
        <div className={styles.headerContainer}>
          <div>
            <h1>{`${car?.year} ${car?.make} ${car?.model} - $${car?.price}`}</h1>
          </div>
        </div>
        <div className={styles.offerInfo}>
          <div className={styles.offerInfoLeft}>
            <div className={styles.infoRow}>
              <p className={styles.label}>{`Date Submitted:`}</p>
              <p>{date}</p>
            </div>
            <div className={styles.infoRow}>
              <p className={styles.label}>{`Offer Id:`}</p>
              <p>{offer.offerId}</p>
            </div>
            <div className={styles.infoRow}>
              <p className={styles.label}>{`Down Payment: `}</p>
              <p>{`$${offer.downPayment.toFixed(2)}`}</p>
            </div>
          </div>
          <div className={styles.offerInfoRight}>
            <div className={styles.infoRow}>
              <p className={styles.label}>{`Car Id: `}</p>
              <p>{offer.carId}</p>
            </div>
            <div className={styles.infoRow}>
              <p className={styles.label}>{`Number of Payments: `}</p>
              <p>{offer.numberOfPayments}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferInfo;
