import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Car } from '../../../models/car';
import {
  Offer,
  PENDING_STATUS,
  ACCEPTED_STATUS,
  REJECTED_STATUS,
} from '../../../models/offer';
import { calculatePaymentsFromOffer } from '../Calculations';
import { CUSTOMER_OFFERS } from '../../../models/constants';
import carService from '../../../services/car.service';
import PaymentSummary from '../payments/PaymentSummary';
import ConfirmOption from './ConfirmOption';
import styles from './OfferItem.module.css';
import { useSelector, RootStateOrAny } from 'react-redux';
import offerService from '../../../services/offer.service';

interface itemProps {
  offer: Offer;
  onResponse: (offer: Offer) => void;
}

const OfferItem = ({ offer, onResponse }: itemProps) => {
  const location = useLocation();
  const currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );
  const empUserId = JSON.parse(currentUser).userId;
  const [car, setCar] = useState<Car | null>(null);
  const [view, setView] = useState(false);
  const [confirmAccept, setConfirmAccept] = useState(false);
  const [confirmReject, setConfirmReject] = useState(false);
  const [customerOffers, setCustomerOffers] = useState(false);

  useEffect(() => {
    if (location.pathname === CUSTOMER_OFFERS) {
      setCustomerOffers(true);
    }

    carService.getCar(offer.carId).then((response) => {
      setCar(response);
    });
  }, [offer.carId, location.pathname]);

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

  const confirmOfferHandler = async (accepted: boolean) => {
    let newOffer = new Offer();

    newOffer.offerId = offer.offerId;
    newOffer.offerDate = offer.offerDate;
    newOffer.empUserId = empUserId;
    newOffer.userId = offer.userId;
    newOffer.carId = offer.carId;
    newOffer.carTotal = offer.carTotal;
    newOffer.downPayment = offer.downPayment;
    newOffer.numberOfPayments = offer.numberOfPayments;

    if (accepted) {
      console.log('Accepted');
      newOffer.status = ACCEPTED_STATUS;
      setConfirmAccept(false);
    } else {
      console.log('Rejected');
      newOffer.status = REJECTED_STATUS;
      setConfirmReject(false);
    }

    offerService
      .updateOffer(newOffer, offer.offerId)
      .then((response) => {
        onResponse(response);
      })
      .catch((error) => {
        onResponse(error);
      });

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
        <div className={styles.rightContainer}>
          <div
            className={
              customerOffers ? styles.buttonContainer : styles.onlyButton
            }
          >
            <button className={styles.summaryButton} onClick={toggleView}>
              {!view ? 'Summary' : 'Hide'}
            </button>
            {customerOffers && offer.status === PENDING_STATUS && (
              <button className={styles.acceptButton} onClick={toggleAccept}>
                Accept
              </button>
            )}
            {customerOffers && offer.status === PENDING_STATUS && (
              <button className={styles.rejectButton} onClick={toggleReject}>
                Reject
              </button>
            )}
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
        <ConfirmOption
          accepted={true}
          buttonText='Accept'
          onConfirm={confirmOfferHandler}
          onCancel={toggleAccept}
        />
      )}
      {confirmReject && (
        <ConfirmOption
          accepted={false}
          buttonText='Reject'
          onConfirm={confirmOfferHandler}
          onCancel={toggleReject}
        />
      )}
    </div>
  );
};

export default OfferItem;
