import { useState, useEffect, useMemo } from 'react';
import { Offer } from '../models/offer';
import offerService from '../services/offer.service';

const useStatus = (offer: Offer, status: string, empUserId: string) => {
  const [response, setResponse] = useState({});
  let newOffer = useMemo(()=> new Offer(), []);

  newOffer.offerId = offer.offerId;
  newOffer.offerDate = offer.offerDate;
  newOffer.status = status;
  newOffer.empUserId = empUserId;
  newOffer.userId = offer.userId;
  newOffer.carId = offer.carId;
  newOffer.carTotal = offer.carTotal;
  newOffer.downPayment = offer.downPayment;
  newOffer.numberOfPayments = offer.numberOfPayments;

  useEffect(() => {

      offerService
        .updateOffer(newOffer, offer.offerId)
        .then((response) => {
          setResponse({ success: true, response, error: null });
        })
        .catch((error) => {
          setResponse({ success: false, response: null, error });
        });

  }, [newOffer, offer.offerId]);

  return response;
};

export default useStatus;
