import React, { useEffect } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Offer } from '../models/offer';
import { offerActions } from '../store/offer-slice';
import offerService from '../services/offer.service';
import OfferDisplay from '../components/system/offers/OfferDisplay';
import AlertDisplay from '../components/UI/AlertDisplay';
import { ALERT, OFFER_HISTORY } from '../models/constants';

const OfferHistory = () => {
  const history = useHistory();
  const currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );

  const userId = JSON.parse(currentUser).userId;

  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get confirmation type and offer from query parameters
  const param = queryParams.get('type');
  const type = param?.split('-', 1);
  const offerId = param?.substring(param.indexOf('-') + 1);

  let action = '';
  let mainHeader = '';
  let targetHeader = 'Here is the offer you just submitted: ';
  let offerHeader = 'Previous Offers';

  // Confirmation header after adding or updating an offer
  if (type) {
    if (type[0] === 'add') {
      action = 'added';
    } else if (type[0] === 'update') {
      action = 'updated';
    }
    mainHeader = `Your offer has been successfully ${action}!`;
  } else {
    // No confirmation; Display regular headere for offer history
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
            totalPaid: result[key].totalPaid,
            numberOfPayments: result[key].numberOfPayments,
          });
        }

        let loadedSubmitted: Offer[] = [];
        let loadedPrevious: Offer[] = [];

        loadedOffers.forEach((offer) => {
          if (offer.offerId === `-${offerId}`) {
            // Recently submitted offer for confirmation
            loadedSubmitted.push(offer);
          } else if (offer.userId === userId) {
            // All of the other offers submitted by the current user
            loadedPrevious.push(offer);
          }
        });

        dispatch(offerActions.setSubmittedOffer(loadedSubmitted));
        dispatch(offerActions.setPreviousOffers(loadedPrevious));
      })
      .catch((error) => error);
  }, [offerId, userId, dispatch]);

  const exitAlert = () => {
    dispatch(offerActions.setSubmittedOffer([]));
    history.push(OFFER_HISTORY);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {!param && <OfferDisplay mainHeader={mainHeader} />}
      {param && (
        <div>
          <AlertDisplay
            type={ALERT.SUCCESS.TYPE}
            heading={mainHeader}
            onExit={exitAlert}
          />
          <OfferDisplay
            targetHeader={targetHeader}
            offersHeader={offerHeader}
          />
        </div>
      )}
    </div>
  );
};

export default OfferHistory;
