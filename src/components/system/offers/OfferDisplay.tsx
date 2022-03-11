import React from 'react';
import { Offer } from '../../../models/offer';
import OfferItem from './OfferItem';
import styles from './OfferDisplay.module.css';

interface displayProps {
  mainHeader?: string;
  targetHeader?: string;
  offersHeader?: string;
  targetOffers?: Offer[];
  offers: Offer[];
}

const OfferDisplay = ({
  mainHeader,
  targetHeader,
  offersHeader,
  targetOffers,
  offers,
}: displayProps) => {
  return (
    <div className={styles.displayContainer}>
      <h1>{mainHeader}</h1>
      {targetOffers && targetOffers.length > 0 && (
        <div>
          <h2>{targetHeader}</h2>
          {targetOffers.map((targetOffer) => {
            return <OfferItem key={targetOffer.offerId} offer={targetOffer} />;
          })}
        </div>
      )}
      {offers.length > 0 && (
        <div>
          <h2>{offersHeader}</h2>
          {offers.map((offer) => {
            return <OfferItem key={offer.offerId} offer={offer} />;
          })}
        </div>
      )}
      {!targetOffers && offers.length === 0 && <p>There are currently no offers to display.</p>}
    </div>
  );
};

export default OfferDisplay;
