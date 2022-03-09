import React from 'react';

import { Offer } from '../../../models/offer';
import styles from './OfferForm.module.css';

interface offerFormProps {
  customerOffer: Offer;
  downPayment: number | string;
  numberOfPayments: number | string;
  onPreview: (event: React.FormEvent<HTMLFormElement>) => void;
  onDownPaymentChange: (downPayment: number | string) => void;
  onNumPaymentChange: (numberOfPayments: number | string) => void;
}

const OfferForm = ({
  customerOffer,
  downPayment,
  numberOfPayments,
  onPreview,
  onDownPaymentChange,
  onNumPaymentChange,
}: offerFormProps) => {
  return (
    <form className={styles.form} onSubmit={onPreview}>
      <div>
        <label>Date: </label>
        <input
          disabled
          placeholder={`${
            customerOffer.offerDate.getMonth() + 1
          }/${customerOffer.offerDate.getDate()}/${customerOffer.offerDate.getFullYear()}`}
        />
        <label>Car Id: </label>
        <input disabled value={customerOffer.carId} />
      </div>
      <div>
        <label>Total Amount: </label>
        <input disabled value={customerOffer.carTotal} />
      </div>
      <div>
        <label>Down Payment: </label>
        <input
          required
          type='number'
          min={5000}
          value={downPayment}
          onChange={(e) => onDownPaymentChange(e.target.value)}
        />
        <label># of Payments</label>
        <input
          required
          type='number'
          max={120}
          value={numberOfPayments}
          onChange={(e) => onNumPaymentChange(e.target.value)}
        />
      </div>
      <button>Preview</button>
    </form>
  );
};

export default OfferForm;
