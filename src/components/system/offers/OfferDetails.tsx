import React, { useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useParams } from 'react-router-dom';

import OfferForm from './OfferForm';
import OfferTable from './OfferTable';
import { Offer } from '../../../models/offer';
import { MAKING_AN_OFFER_INSTRUCTIONS } from '../../../models/constants';
import styles from './OfferForm.module.css';
import PaymentInfo from '../payments/PaymentInfo';

interface offerFormProps {
  carTotal: number;
}

const OfferDetails = ({ carTotal }: offerFormProps) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [downPayment, setDownPayment] = useState<number | string>('');
  const [numberOfPayments, setNumberOfPayments] = useState<number | string>('');
  const params = useParams<{ carId: string }>();
  let customerOffer = new Offer();
  const currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );
  let user = JSON.parse(currentUser);

  customerOffer.userId = user.userId;
  customerOffer.carId = params.carId;
  customerOffer.offerId = `${user.userId}${params.carId}`;
  customerOffer.carTotal = carTotal;
  customerOffer.downPayment = +downPayment;
  customerOffer.numberOfPayments = +numberOfPayments;

  const previewHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    customerOffer.downPayment = +downPayment;
    setPreviewMode(true);
  };

  return (
    <div>
      {!previewMode && (
        <div className={styles.formContainer}>
          <p>{MAKING_AN_OFFER_INSTRUCTIONS}</p>
          <OfferForm
            customerOffer={customerOffer}
            downPayment={downPayment}
            numberOfPayments={numberOfPayments}
            onPreview={previewHandler}
            onDownPaymentChange={setDownPayment}
            onNumPaymentChange={setNumberOfPayments}
          />
        </div>
      )}
      {previewMode && (
        <div>
          <PaymentInfo
            totalAmount={customerOffer.carTotal}
            downPayment={customerOffer.downPayment}
            numberOfPayments={customerOffer.numberOfPayments}
            onReturn={setPreviewMode}
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
