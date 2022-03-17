import React, { useEffect } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Offer } from '../models/offer';
import { offerActions } from '../store/offer-slice';
import offerService from '../services/offer.service';
import OfferDisplay from '../components/system/offers/OfferDisplay';

const OfferHistory = () => {
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
            dispatch(
              offerActions.setSubmittedOffer({ submittedOffer: currentOffer })
            );
            // setTargetOffer(targetArray);
          } else if (response[key].userId === userId) {
            loadedOffers.push(currentOffer);
          }
        }
        dispatch(
          offerActions.setPreviousOffers({ previousOffers: loadedOffers })
        );
        // setOtherOffers(loadedOffers);
      })
      .catch((error) => error);
  }, [offerId, userId, dispatch]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {submittedOffer && (
        <OfferDisplay
          mainHeader={mainHeader}
          targetHeader={targetHeader}
          offersHeader={offerHeader}
        />
      )}
      {!submittedOffer && <OfferDisplay mainHeader={mainHeader} />}
    </div>
  );
};

export default OfferHistory;
