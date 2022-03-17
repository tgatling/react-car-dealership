import React, { useEffect, useState } from 'react';
import { Offer, PENDING_STATUS } from '../models/offer';
import offerService from '../services/offer.service';
import OfferDisplay from '../components/system/offers/OfferDisplay';

const CustomerOffers = () => {
  const [pendingOffers, setPendingOffers] = useState<Offer[]>([]);
  const [processedOffers, setProcessedOffers] = useState<Offer[]>([]);

  useEffect(() => {
    offerService
      .getAllOffers()
      .then((response) => {
        let loadedPending: Offer[] = [];
        let loadedProcessed: Offer[] = [];
        for (const key in response) {
          let currentOffer = new Offer();
          currentOffer.offerId = response[key].offerId;
          currentOffer.offerDate = response[key].offerDate;
          currentOffer.status = response[key].status;
          currentOffer.carId = response[key].carId;
          currentOffer.userId = response[key].userId;
          currentOffer.empUserId = response[key].empUserId;
          currentOffer.carTotal = response[key].carTotal;
          currentOffer.downPayment = response[key].downPayment;
          currentOffer.numberOfPayments = response[key].numberOfPayments;
          if (response[key].status === PENDING_STATUS) {
            loadedPending.push(currentOffer);
          } else {
            loadedProcessed.push(currentOffer);
          }
        }
        setPendingOffers(loadedPending);
        setProcessedOffers(loadedProcessed);
      })
      .catch((error) => error);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <OfferDisplay
        targetHeader='Pending Offers'
        offersHeader='Processed Offers'
        targetOffers={pendingOffers}
        offers={processedOffers}
      />
    </div>
  );
};

export default CustomerOffers;
