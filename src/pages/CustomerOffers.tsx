import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { offerActions } from '../store/offer-slice';
import { Offer, PENDING_STATUS } from '../models/offer';
import { ALERT_TYPE } from '../models/constants';
import offerService from '../services/offer.service';
import AlertDisplay from '../components/UI/AlertDisplay';
import OfferDisplay from '../components/system/offers/OfferDisplay';

const CustomerOffers = () => {
  const dispatch = useDispatch();

  // Response from updating offer status
  const [response, setResponse] = useState<{
    type: string;
    data?: Offer;
    error?: string;
  } | null>(null);

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

        dispatch(offerActions.setPendingOffers(loadedPending));
        dispatch(offerActions.setProcessedOffers(loadedProcessed));
      })
      .catch((error) => error);
  }, [dispatch, response]);

  const exitAlert = () => {
    setResponse(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {response && (
        <div>
          {
            response.type === ALERT_TYPE.SUCCESS ? (
              <AlertDisplay
                type={ALERT_TYPE.SUCCESS}
                heading={`YOUR OFFER DECISION HAS BEEN SUBMITTED`}
                message={`Offer ${response.data?.offerId} status has been changed to ${response.data?.status}`}
                onExit={exitAlert}
                onClick={exitAlert}
              />

            ):(
              <AlertDisplay
              type={ALERT_TYPE.ERROR}
              heading='AN ERROR HAS OCCURRED'
              message='Please try submitting your decision again.'
              onExit={exitAlert}
              onClick={exitAlert}
            />
            )
          }
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <OfferDisplay
          targetHeader='Pending Offers'
          offersHeader='Processed Offers'
          onResponse={setResponse}
        />
      </div>
    </div>
  );
};

export default CustomerOffers;
