import React, { useEffect, useState } from 'react';
import { Offer } from '../models/offer';
import offerService from '../services/offer.service';
import { useLocation } from 'react-router-dom';
import OfferDisplay from '../components/system/offers/OfferDisplay';
import {useSelector, RootStateOrAny} from 'react-redux';

const OfferHistory = () => {
  const [targetOffer, setTargetOffer] = useState<Offer[]>([]);
  const [otherOffers, setOtherOffers] = useState<Offer[]>([]);
  const currentUser = useSelector((state: RootStateOrAny)=> state.user.currentUser);
  const userId = JSON.parse(currentUser).userId;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const param = queryParams.get('type');
  const type = param?.split('-', 1);
  const offerId = param?.substring(param.indexOf('-') + 1);

  let action = '';
  let mainHeader = '';
  let targetHeader = 'Here is the offer you just submitted: ';
  let offerHeader = 'Previous Offers';

  if (type) {
    if (type[0] === 'add') {
      action = 'added';
    } else if (type[0] === 'update') {
      action = 'updated';
    }
    mainHeader = `Your offer has been successfully ${action}!`;
  } else {
    mainHeader = 'Offer History';
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
            let targetArray: Offer[] = []
            targetArray.push(currentOffer)
            setTargetOffer(targetArray);
          } else if( response[key].userId === userId) {
            loadedOffers.push(currentOffer);
          }
        }
        setOtherOffers(loadedOffers);
      })
      .catch((error) => error);
  }, [offerId, userId]);

  return (
    <div>
      {targetOffer && (
        <OfferDisplay
          mainHeader={mainHeader}
          targetHeader={targetHeader}
          offersHeader={offerHeader}
          targetOffers={targetOffer}
          offers={otherOffers}
        />
      )}
      {!targetOffer && <OfferDisplay mainHeader={mainHeader} offers={otherOffers} />}
    </div>
  );
};

export default OfferHistory;
