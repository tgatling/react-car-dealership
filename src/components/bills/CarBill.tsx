import React, { useState, useEffect } from 'react';

import offerService from '../../services/offer.service';
import carService from '../../services/car.service';
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

  return (
    <div className={styles.offerContainer}>
      <div className={styles.offerHeading}>
        <h2>{`${car?.year} ${car?.make} ${car?.model}`}</h2>
        <h3>{`Offer Id: ${offerId}`}</h3>
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
