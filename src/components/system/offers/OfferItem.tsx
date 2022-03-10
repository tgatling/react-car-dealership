import React from 'react';
import { Offer } from '../../../models/offer';

interface itemProps {
  offer: Offer;
}

const OfferItem = ({ offer }: itemProps) => {
  return (
    <div>
      <p>{offer.offerDate}</p>
      <p>{offer.offerId}</p>
      <p>{offer.carId}</p>
      <p>{offer.carTotal}</p>
      <p>{offer.downPayment}</p>
      <p>{offer.status}</p>
      <p>{offer.numberOfPayments}</p>
    </div>
  );
};

export default OfferItem;
