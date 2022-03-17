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
      .then((result) => {
        let loadedOffers: Offer[] = [];
        for (const key in result) {
          loadedOffers.push({
            offerId: result[key].offerId,
            offerDate: result[key].offerDate,
            status: result[key].status,
            carId: result[key].carId,
            userId: result[key].userId,
            empUserId: result[key].empUserId,
            carTotal: result[key].carTotal,
            downPayment: result[key].downPayment,
            numberOfPayments: result[key].numberOfPayments,
          });
        }

        let loadedPending: Offer[] = [];
        let loadedProcessed: Offer[] = [];

        loadedOffers.forEach((offer) => {
          if (offer.status === PENDING_STATUS) {
            loadedPending.push(offer);
          } else {
            loadedProcessed.push(offer);
          }
        });

        loadedPending.sort((a, b) =>
          a.carId < b.carId ? -1 : a.carId > b.carId ? 1 : 0
        );

        loadedProcessed.sort((a, b) =>
          a.carId < b.carId ? -1 : a.carId > b.carId ? 1 : 0
        );

        dispatch(
          offerActions.setPendingOffers({ pendingOffers: loadedPending })
        );
        dispatch(
          offerActions.setProcessedOffers({ processedOffers: loadedProcessed })
        );
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
