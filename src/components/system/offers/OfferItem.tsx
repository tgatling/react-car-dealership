import React, { useEffect, useState } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import PaymentSummary from '../payments/summary/PaymentSummary';
import ConfirmOption from './ConfirmOption';
import offerService from '../../../services/offer.service';
import carService from '../../../services/car.service';
import OfferInfo from './OfferInfo';
import styles from './OfferItem.module.css';

import { calculatePaymentsFromOffer } from '../Calculations';
import { CUSTOMER_OFFERS } from '../../../models/constants';
import { carActions } from '../../../store/car-slice';
import { ALERT } from '../../../models/constants';
import { Car } from '../../../models/car';
import {
  Offer,
  PENDING_STATUS,
  ACCEPTED_STATUS,
  REJECTED_STATUS,
} from '../../../models/offer';

interface itemProps {
  offer: Offer;
  onResponse: (response: {
    type: string;
    data?: Offer;
    error?: string;
  }) => void;
}

const OfferItem = ({ offer, onResponse }: itemProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );

  const pendingOffers = useSelector(
    (state: RootStateOrAny) => state.offer.pendingOffers
  );

  const empUserId = JSON.parse(currentUser).userId;
  const [car, setCar] = useState<Car | null>(null);
  const [viewPaymentSummary, setViewPaymentSummary] = useState(false);
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

  // Payment summary display
  const toggleView = () => {
    setViewPaymentSummary(!viewPaymentSummary);
  };

  // Decision selection before confirmation
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
    // update offer information in the database and return response
    let newOffer = new Offer();
    let otherOffers: Offer[] = [];

    newOffer.offerId = offer.offerId;
    newOffer.offerDate = offer.offerDate;
    newOffer.empUserId = empUserId;
    newOffer.userId = offer.userId;
    newOffer.carId = offer.carId;
    newOffer.carTotal = offer.carTotal;
    newOffer.downPayment = offer.downPayment;
    newOffer.numberOfPayments = offer.numberOfPayments;

    if (accepted) {
      // Change status of accepted offer
      newOffer.status = ACCEPTED_STATUS;
      setConfirmAccept(false);

      // Update the car to owned status
      carService
        .getCar(newOffer.carId)
        .then((response) => {
          let newCarInfo: Car = response;
          newCarInfo.owner = newOffer.userId;

          carService
            .updateCar(newCarInfo, newOffer.carId)
            .then((result) => {
              dispatch(carActions.editCar({ car: result, id: result.carId }));
            })
            .catch((error) => error);
        })
        .catch((error) => error);

      // reject all other offers on the vehicle
      otherOffers = pendingOffers.filter(
        (offer: Offer) =>
          offer.offerId !== newOffer.offerId && offer.carId === newOffer.carId
      );

      otherOffers.forEach((offer: Offer) => {
        let rejectedOffer = new Offer();

        rejectedOffer.offerId = offer.offerId;
        rejectedOffer.offerDate = offer.offerDate;
        rejectedOffer.empUserId = empUserId;
        rejectedOffer.userId = offer.userId;
        rejectedOffer.carId = offer.carId;
        rejectedOffer.carTotal = offer.carTotal;
        rejectedOffer.downPayment = offer.downPayment;
        rejectedOffer.numberOfPayments = offer.numberOfPayments;
        rejectedOffer.status = REJECTED_STATUS;

        offerService
          .updateOffer(rejectedOffer, rejectedOffer.offerId)
          .then((response) => response)
          .catch((error) => error);
      });
    } else {
      // Change status of rejected offer
      newOffer.status = REJECTED_STATUS;
      setConfirmReject(false);
    }

    // Update the accepted/rejected offer
    offerService
      .updateOffer(newOffer, offer.offerId)
      .then((response) => {
        onResponse({ type: ALERT.SUCCESS.TYPE, data: response });
      })
      .catch((error) => {
        onResponse({ type: ALERT.ERROR.TYPE, data: error });
      });
  };

  // Get summary information to display
  let { paymentCalculations } = calculatePaymentsFromOffer(
    offer.carTotal,
    offer.downPayment,
    offer.numberOfPayments
  );

  // Determine if first payment is equal to all other payments
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
          {/* Car and Offer Status */}
          <OfferInfo offer={offer} car={car} />
        </div>

        {/* Offer Buttons: Summary, Accept, and Reject */}
        <div className={styles.rightContainer}>
          <div
            className={
              customerOffers ? styles.buttonContainer : styles.onlyButton
            }
          >
            <button className={styles.summaryButton} onClick={toggleView}>
              {!viewPaymentSummary ? 'Summary' : 'Hide'}
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

      {/* Display payment summary information */}
      {viewPaymentSummary && (
        <div className={styles.viewContainer}>
          <PaymentSummary
            downPayment={offer.downPayment}
            equalPayments={equalPayments}
            numberOfPayments={offer.numberOfPayments}
            paymentCalculations={paymentCalculations}
            header={true}
          />
        </div>
      )}

      {/* Prompt for confirmation for offer decision */}
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
