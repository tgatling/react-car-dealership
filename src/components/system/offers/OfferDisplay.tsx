import React from 'react';
import { Offer } from '../../../models/offer';
import OfferItem from './OfferItem';

interface displayProps {
  heading?: string;
  targetOffer?: Offer;
  offers: Offer[];
}

const OfferDisplay = ({
  heading,
  targetOffer,
  offers,
}: displayProps) => {
  return (
    <div>
      <h1>{heading}</h1>
      {targetOffer && (
        <div>
          <h2>{`Here is the offer you just submitted: `}</h2>
          <div>
            <OfferItem offer={targetOffer}/>
          </div>
        </div>
      )}
      {targetOffer && <h2>Previous Offers</h2>}
      {offers.map((offer) => {
        return (
          <OfferItem key={offer.offerId} offer={offer}/>
        );
      })}
    </div>
  );
};

export default OfferDisplay;
