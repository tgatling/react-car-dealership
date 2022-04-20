import React, { useEffect, useState } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Offer } from '../models/offer';
import { offerActions } from '../store/offer-slice';
import offerService from '../services/offer.service';
import OfferDisplay from '../components/system/offers/OfferDisplay';

const OfferHistory = () => {
  const [response, setResponse] = useState<string | Offer>('');

  const currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );
  const { submittedOffer } = useSelector(
    (state: RootStateOrAny) => state.offer
  );
  const userId = JSON.parse(currentUser).userId;

  const dispatch = useDispatch();
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

        let loadedSubmitted: Offer[] = [];
        let loadedPrevious: Offer[] = [];

        loadedOffers.forEach((offer) => {
          if (offer.offerId === `-${offerId}`) {
            loadedSubmitted.push(offer);
          } else if (offer.userId === userId) {
            loadedPrevious.push(offer);
          }
        });

        dispatch(offerActions.setSubmittedOffer(loadedSubmitted));
        dispatch(offerActions.setPreviousOffers(loadedPrevious));
      })
      .catch((error) => error);
  }, [offerId, userId, dispatch, response]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {submittedOffer && (
        <OfferDisplay
          mainHeader={mainHeader}
          targetHeader={targetHeader}
          offersHeader={offerHeader}
          onResponse={setResponse}
        />
      )}
      {!submittedOffer && <OfferDisplay mainHeader={mainHeader} onResponse={setResponse}/>}
    </div>
  );
};

export default OfferHistory;
