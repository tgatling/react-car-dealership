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
  onResponse?: (response: {
    type: string;
    data?: Offer;
    error?: string;
  }) => void;
}

const OfferDisplay = ({
  mainHeader,
  targetHeader,
  offersHeader,
  onResponse,
}: displayProps) => {
  const location = useLocation();

  // Offer groupings to display depending on page: Customer Offers or Current Offers
  const { pendingOffers, processedOffers, submittedOffer, previousOffers } =
    useSelector((state: RootStateOrAny) => state.offer);

  let targetOffers: Offer[] = [];
  let otherOffers: Offer[] = [];

  // determine the page and what content to display
  if (location.pathname === CUSTOMER_OFFERS) {
    targetOffers = pendingOffers;
    otherOffers = processedOffers;
  } else {
    targetOffers = submittedOffer;
    otherOffers = previousOffers;
  }

  const submittedHandler = (response: {
    type: string;
    data?: Offer;
    error?: string;
  }) => {
    if (onResponse) onResponse(response); //Send back response from updating the offer
  };

  const displayMainHeader =
    targetOffers.length !== 0 || otherOffers.length !== 0 ? true : false;

  return (
    <div className={styles.displayContainer}>
      {/* Main Header - only displayed when there are offers */}
      {displayMainHeader && <h1>{mainHeader}</h1>}

      {/* Submitted or Pending offers depending on page */}
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

      {/* Processed or Previous offers depending on page */}
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

      {/* Message when there are no offers to display */}
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
