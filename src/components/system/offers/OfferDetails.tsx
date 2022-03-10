import React, { useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import OfferForm from './OfferForm';
import OfferTable from './OfferTable';
import { Offer } from '../../../models/offer';
import {MAKING_AN_OFFER_INSTRUCTIONS, CURRENT_OFFERS} from '../../../models/constants';
import styles from './OfferForm.module.css';
import PaymentInfo from '../payments/PaymentInfo';
import offerService from '../../../services/offer.service';

interface offerFormProps {
  carTotal: number;
  showHeading: (showHeading: boolean) => void;
}

const OfferDetails = ({ carTotal, showHeading }: offerFormProps) => {
  const [offerInSystem, setOfferInSystem] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [downPayment, setDownPayment] = useState<number | string>('');
  const [numberOfPayments, setNumberOfPayments] = useState<number | string>('');
  const [httpError, setHttpError] = useState(null);

  const params = useParams<{ carId: string }>();
  const history = useHistory();

  let customerOffer = new Offer();

  const currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );
  let user = JSON.parse(currentUser);

  customerOffer.carId = params.carId;
  customerOffer.userId = user.userId;
  customerOffer.carTotal = carTotal;
  customerOffer.downPayment = +downPayment;
  customerOffer.numberOfPayments = +numberOfPayments;

  const previewHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    customerOffer.downPayment = +downPayment;
    setPreviewMode(true);
    showHeading(false);
  };

  const submitOfferHandler = () => {
    setOfferInSystem(false);
    if (!downPayment || !numberOfPayments) {
      return;
    }
    offerService
      .getAllOffers()
      .then((response) => {
        for (const key in response) {
          if (
            response[key].carId === customerOffer.carId &&
            response[key].userId === customerOffer.userId
          ) {
            setOfferInSystem(true);
          }
        }
      })
      .catch((error) => error);

    console.log(offerInSystem);

    if (!offerInSystem) {
      offerService
        .addOffer(customerOffer)
        .then((response) => {
          customerOffer.offerId = response.name;
          offerService
            .updateOffer(customerOffer, response.name)
            .then((result) => {
              console.log(result);
            })
            .catch((error) => setHttpError(error));
        })
        .catch((error) => setHttpError(error));

        history.push(CURRENT_OFFERS);
    }
  };

  return (
    <div>
      {!previewMode && (
        <div className={styles.formContainer}>
          <p>{MAKING_AN_OFFER_INSTRUCTIONS}</p>
          <OfferForm
            error={httpError}
            customerOffer={customerOffer}
            downPayment={downPayment}
            numberOfPayments={numberOfPayments}
            onPreview={previewHandler}
            onDownPaymentChange={setDownPayment}
            onNumPaymentChange={setNumberOfPayments}
            onSubmitOffer={submitOfferHandler}
          />
        </div>
      )}
      {previewMode && (
        <div>
          <PaymentInfo
            totalAmount={customerOffer.carTotal}
            downPayment={customerOffer.downPayment}
            numberOfPayments={customerOffer.numberOfPayments}
            previewMode={setPreviewMode}
            showHeading={showHeading}
          />
          <OfferTable
            totalAmount={customerOffer.carTotal}
            downPayment={customerOffer.downPayment}
            numberOfPayments={customerOffer.numberOfPayments}
          />
        </div>
      )}
    </div>
  );
};

export default OfferDetails;
