import React, { useEffect, useState } from 'react';
import { Offer } from '../models/offer';
import offerService from '../services/offer.service';
import { useLocation } from 'react-router-dom';
import OfferDisplay from '../components/system/offers/OfferDisplay';

const OfferHistory = () => {
  const [targetOffer, setTargetOffer] = useState<Offer | null>(null);
  const [otherOffers, setOtherOffers] = useState<Offer[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const param = queryParams.get('type');
  const type = param?.split('-', 1);
  const offerId = param?.substring(param.indexOf('-') + 1);

  let action = '';
  let heading = '';

  if (type) {
    if (type[0] === 'add') {
      action = 'added';
    } else if (type[0] === 'update') {
      action = 'updated';
    }
    heading = `Your offer has been successfully ${action}!`;
  } else {
    heading = 'Offer History';
  }

  useEffect(() => {
    offerService
      .getAllOffers()
      .then((response) => {
        let loadedOffers: Offer[] = [];
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

          if (response[key].offerId === `-${offerId}`) {
            setTargetOffer(currentOffer);
          } else {
            loadedOffers.push(currentOffer);
          }
        }
        setOtherOffers(loadedOffers);
      })
      .catch((error) => error);
  }, [offerId]);

  return (
    <div>
      {targetOffer && (
        <OfferDisplay
          heading={heading}
          targetOffer={targetOffer}
          offers={otherOffers}
        />
      )}
      {!targetOffer && <OfferDisplay heading={heading} offers={otherOffers} />}
    </div>
  );
};

export default OfferHistory;
