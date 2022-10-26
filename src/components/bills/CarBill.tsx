import React, { useState, useEffect } from 'react';

import offerService from '../../services/offer.service';
import carService from '../../services/car.service';
import statement from '../../images/payments/bank-statement.png';
import BillItem from './BillItem';
import styles from './BillDisplay.module.css';

import { Bill } from '../../models/payments';
import { Offer } from '../../models/offer';
import { Car } from '../../models/car';
import BillBreakdown from './BillBreakdown';

interface carBillProp {
  userBills: Bill[];
  offerId: string;
}

/**
 * Car Bill Component
 * @param {Bill[]} userBills array of bills associated with specififed vehicle
 * @param {string} offerId id given when offer was made on specified vehicle
 * @returns List of each bill associated with specified vehicle
 */

const CarBill = ({ userBills, offerId }: carBillProp) => {
  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [car, setCar] = useState<Car | null>(null);

  
  useEffect(() => {
    offerService
      .getOffer(offerId)
      .then((offerResponse) => {
        setOffer(offerResponse);
        carService.getCar(offerResponse.carId).then((carResponse) => {
          setCar(carResponse);
        });
      })
      .catch((error) => {});

    let offerBills = userBills.filter((bill) => bill.offerId === offerId);
    setFilteredBills(offerBills);
  }, [offerId, userBills]);

  let remainingBalance = offer ? offer?.carTotal - offer?.totalPaid : ' ';

  return (
    <div>
      {car && (
        <div className={styles.offerContainer}>
          {/* <div className={styles.offerIcon}>
        <img src={statement} alt='statement' />
      </div> */}
          <div className={styles.offerHeading}>
            {car && <h1>{`${car.year} ${car.make} ${car.model}`}</h1>}
            {remainingBalance !== 0 ? (
              <div>
                <div className={styles.rowElement}>
                  <div>
                    <h2>{`Total Amount: `}</h2>
                    <h2>{`Total Paid: `}</h2>
                    <h2>{`Remaining Balance: `}</h2>
                  </div>
                  <div>
                    <h2>$</h2>
                    <h2>$</h2>
                    <h2>$</h2>
                  </div>
                  <div className={styles.leftAlign}>
                    <h2>{`${car?.price.toFixed(2)}`}</h2>
                    <h2>{`${offer?.totalPaid}`}</h2>{' '}
                    <h2>{`${remainingBalance}`}</h2>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2>
                  {' '}
                  Congratulations! You have completed all payments on this
                  vehicle!
                </h2>
              </div>
            )}
          </div>
          <BillBreakdown bills={filteredBills} />
          {/* <div>
        {filteredBills.map((bill) => {
          return (
            <div key={bill.billId}>
            <BillItem bill={bill} />
            </div>
            );
          })}
        </div> */}
        </div>
      )}
    </div>
  );
};

export default CarBill;
