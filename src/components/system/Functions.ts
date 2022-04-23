import { Offer } from '../../models/offer';
import offerService from '../../services/offer.service';

// OFFERS

export const changeOfferStatus = (
  offer: Offer,
  status: string,
  empUserId: string
) => {
  let result: string | Offer | {} = '';
  if (empUserId === offer.userId) {
    return {
      success: false,
      updatedOffer: null,
      error: 'Employee and User Id Match',
    };
  }

  let newOffer = new Offer();

  newOffer.offerId = offer.offerId;
  newOffer.offerDate = offer.offerDate;
  newOffer.status = status;
  newOffer.empUserId = empUserId;
  newOffer.userId = offer.userId;
  newOffer.carId = offer.carId;
  newOffer.carTotal = offer.carTotal;
  newOffer.downPayment = offer.downPayment;
  newOffer.numberOfPayments = offer.numberOfPayments;

  offerService
    .updateOffer(newOffer, offer.offerId)
    .then((response) => {
      return (result = response);
    })
    .catch((error) => {
      result = error;
    });
  return result;
};

export const checkDealerOffers = (empUserId: string) => {
  let response;
  let dealerOffers: { carId: string; status: string }[] = [];

  offerService
    .getAllOffers()
    .then((response) => {
      for (const key in response) {
        if (response[key].empUserId === empUserId) {
          dealerOffers.push({
            carId: response[key].carId,
            status: response[key].status,
          });
        }
      }
      response = {
        dealerOffers,
        error: null,
      };
    })
    .catch((error) => {
      response = {
        dealerOffers: null,
        error,
      };
    });

  return response;
};
