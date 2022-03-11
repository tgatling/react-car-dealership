import React, { useEffect, useState } from 'react';
import { Car } from '../../../models/car';
import { Offer } from '../../../models/offer';
import carService from '../../../services/car.service';
import { calculatePaymentsFromOffer } from '../Calculations';
import PaymentSummary from '../payments/PaymentSummary';
import styles from './OfferItem.module.css';

interface itemProps {
  offer: Offer;
}

const OfferItem = ({ offer }: itemProps) => {
  const [car, setCar] = useState<Car | null>(null);
  const [view, setView] = useState(false);
  const [confirmAccept, setConfirmAccept] = useState(false);
  const [confirmReject, setConfirmReject] = useState(false);

  useEffect(() => {
    carService.getCar(offer.carId).then((response) => {
      setCar(response);
    });
  }, [offer.carId]);

  let date = '';
  if (offer.offerDate) {
    let offerDate = new Date(offer.offerDate);
    date = `${
      offerDate.getMonth() + 1
    }/${offerDate.getDate()}/${offerDate.getFullYear()}`;
  }

  const toggleView = () => {
    setView(!view);
  };
  const toggleAccept = () => {
    if (confirmReject) {
      setConfirmReject(false);
    }
    setConfirmAccept(!confirmAccept);
  };
  const toggleReject = () => {
    if (confirmAccept) {
      setConfirmAccept(false);
    }
    setConfirmReject(!confirmReject);
  };

  let { paymentCalculations } = calculatePaymentsFromOffer(
    offer.carTotal,
    offer.downPayment,
    offer.numberOfPayments
  );

  let equalPayments: boolean;

  if (paymentCalculations.length > 1) {
    equalPayments =
      paymentCalculations[0].amount === paymentCalculations[1].amount
        ? true
        : false;
  } else {
    equalPayments = true;
  }

  return (
    <div>
      <div className={styles.itemContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.imageContainer}>
            <img src={car?.url} alt='' />
            <p>{`STATUS: ${offer.status}`}</p>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.headerContainer}>
              <div>
                <h1>{`${car?.year} ${car?.make} ${car?.model} - $${car?.price}`}</h1>
              </div>
            </div>
            <div className={styles.offerInfo}>
              <div>
                <p>{`Date Submitted: ${date}`}</p>
              </div>
              <div>
                <p>{`Offer Id: ${offer.offerId}`}</p>
                <p>{`Car Id: ${offer.carId}`}</p>
              </div>
              <div>
                <p>{`Down Payment $${offer.downPayment.toFixed(2)}`}</p>
                <p>{`Number of Payments: ${offer.numberOfPayments}`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.buttonContainer}>
            <button className={styles.viewButton} onClick={toggleView}>
              {!view ? 'View' : 'Hide'}
            </button>
            <button className={styles.acceptButton}>Accept</button>
            <button className={styles.rejectButton}>Reject</button>
          </div>
        </div>
      </div>
      {view && (
        <div className={styles.viewContainer}>
          <PaymentSummary
            equalPayments={equalPayments}
            numberOfPayments={offer.numberOfPayments}
            paymentCalculations={paymentCalculations}
            header={true}
          />
        </div>
      )}

      {confirmAccept && (
        <div className={styles.viewContainer} onClick={toggleAccept}>
          Confirmation for Accepting
        </div>
      )}
      {confirmReject && (
        <div className={styles.viewContainer} onClick={toggleReject}>
          Confirmation for Rejecting
        </div>
      )}
    </div>
  );
};

export default OfferItem;