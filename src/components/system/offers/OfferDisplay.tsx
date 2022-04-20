import React from 'react';
import { Offer } from '../../../models/offer';
import OfferItem from './OfferItem';
import styles from './OfferDisplay.module.css';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CUSTOMER_OFFERS } from '../../../models/constants';
import logo from '../../../images/family-car.png';

interface displayProps {
  mainHeader?: string;
  targetHeader?: string;
  offersHeader?: string;
  onResponse: (response: string | Offer) => void;
}

const OfferDisplay = ({
  mainHeader,
  targetHeader,
  offersHeader,
  onResponse,
}: displayProps) => {
  const location = useLocation();

  const {
    // decision,
    pendingOffers,
    processedOffers,
    submittedOffer,
    previousOffers,
  } = useSelector((state: RootStateOrAny) => state.offer);

  let targetOffers: Offer[] = [];
  let otherOffers: Offer[] = [];

  if (location.pathname === CUSTOMER_OFFERS) {
    targetOffers = pendingOffers;
    otherOffers = processedOffers;
  } else {
    targetOffers = submittedOffer;
    otherOffers = previousOffers;
  }

  const submittedHandler = (response: string | Offer) => {
    onResponse(response);
    console.log(response);
  };

  return (
    <div className={styles.displayContainer}>
      {targetOffers.length !== 0 && otherOffers.length !== 0 && (
        <h1>{mainHeader}</h1>
      )}

      {targetOffers.length !== 0 && (
        <div>
          <h2>{targetHeader}</h2>
          {targetOffers.map((targetOffer: Offer) => {
            return (
              <OfferItem
                key={targetOffer.offerId}
                offer={targetOffer}
                onResponse={submittedHandler}
              />
            );
          })}
        </div>
      )}
      {otherOffers.length !== 0 && (
        <div>
          <h2>{offersHeader}</h2>
          {otherOffers.map((offer: Offer) => {
            return (
              <OfferItem
                key={offer.offerId}
                offer={offer}
                onResponse={submittedHandler}
              />
            );
          })}
        </div>
      )}
      {targetOffers.length === 0 && otherOffers.length === 0 && (
        <div className={styles.message}>
          <img src={logo} alt='' />
          <p>There are currently no offers to display.</p>
        </div>
      )}
    </div>
  );
};

export default OfferDisplay;
