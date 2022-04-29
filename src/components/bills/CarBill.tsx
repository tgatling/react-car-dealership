import React, { useState, useEffect } from 'react';

import offerService from '../../services/offer.service';
import carService from '../../services/car.service';
import statement from '../../images/payments/bank-statement.png';
import BillItem from './BillItem';
import styles from './BillDisplay.module.css';

import { Bill } from '../../models/payments';
import { Offer } from '../../models/offer';
import { Car } from '../../models/car';

interface carBillProp {
  userBills: Bill[];
  offerId: string;
}
const CarBill = ({ userBills, offerId }: carBillProp) => {
  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    offerService.getOffer(offerId).then((offerResponse) => {
      setOffer(offerResponse);
      carService.getCar(offerResponse.carId).then((carResponse) => {
        setCar(carResponse);
      });
    });

    let offerBills = userBills.filter((bill) => bill.offerId === offerId);
    setFilteredBills(offerBills);
  }, [offerId, userBills]);

    let remainingBalance = offer ? offer?.carTotal - offer?.totalPaid : ' ';

  return (
    <div className={styles.offerContainer}>
      <div className={styles.icon}>
        <img src={statement} alt='statement' />
      </div>
      <div className={styles.offerHeading}>
        {car && (
          <h1>{`${car.year} ${car.make} ${car.model} - $${car.price}`}</h1>
        )}
        {remainingBalance !== 0 ? (
          <div className={styles.row}>
            <div className={styles.rowElement}>
              <h2>{`Paid Total: $${offer?.totalPaid}`}</h2>
            </div>
            <div className={styles.rowElement}>
              <h2>{`Remaining Balance: $${remainingBalance}`}</h2>
            </div>
          </div>
        ) : (
          <div>
            <h2>
              {' '}
              Congratulations! You have completed all payments on this vehicle!
            </h2>
          </div>
        )}
      </div>
      <div>
        {filteredBills.map((bill) => {
          return (
            <div key={bill.billId}>
              <BillItem bill={bill} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarBill;
