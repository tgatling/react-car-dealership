import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { offerActions } from '../store/offer-slice';
import { Offer, PENDING_STATUS } from '../models/offer';
import offerService from '../services/offer.service';
import OfferDisplay from '../components/system/offers/OfferDisplay';

const CustomerOffers = () => {
  const dispatch = useDispatch();

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

        loadedPending.sort((a, b) =>
          a.carId < b.carId ? -1 : a.carId > b.carId ? 1 : 0
        );

        loadedProcessed.sort((a, b) =>
          a.carId < b.carId ? -1 : a.carId > b.carId ? 1 : 0
        );

        dispatch(offerActions.setPendingOffers({ pendingOffers: loadedPending }));
        dispatch(offerActions.setProcessedOffers({ processedOffers: loadedProcessed }));
      })
      .catch((error) => error);
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <OfferDisplay
        targetHeader='Pending Offers'
        offersHeader='Processed Offers'
      />
    </div>
  );
};

export default CustomerOffers;
