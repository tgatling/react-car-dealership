import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';

import { offerActions } from '../store/offer-slice';
import { Offer, PENDING_STATUS } from '../models/offer';
import offerService from '../services/offer.service';
import OfferDisplay from '../components/system/offers/OfferDisplay';

const CustomerOffers = () => {
  const dispatch = useDispatch();

  // response from updating offer status
  const [response, setResponse] = useState<string | Offer>('');

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


        // sort cars based on id so offers on the same car appear together
        loadedPending.sort((a, b) =>
          a.carId < b.carId ? -1 : a.carId > b.carId ? 1 : 0
        );

        loadedProcessed.sort((a, b) =>
          a.carId < b.carId ? -1 : a.carId > b.carId ? 1 : 0
        );

        dispatch(
          offerActions.setPendingOffers(loadedPending)
        );
        dispatch(
          offerActions.setProcessedOffers(loadedProcessed)
        );
      })
      .catch((error) => error);
  }, [dispatch, response]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <OfferDisplay
        targetHeader='Pending Offers'
        offersHeader='Processed Offers'
        onResponse={setResponse}
      />
    </div>
  );
};

export default CustomerOffers;
