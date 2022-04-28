import React from 'react';

import styles from './OfferForm.module.css';

import { Offer } from '../../models/offer';

interface offerFormProps {
  error: string | null;
  customerOffer: Offer;
  downPayment: number | string;
  numberOfPayments: number | string;
  onPreview: (event: React.FormEvent<HTMLFormElement>) => void;
  onDownPaymentChange: (downPayment: number | string) => void;
  onNumPaymentChange: (numberOfPayments: number | string) => void;
  onSubmitOffer: () => void;
}

const OfferForm = ({
  error,
  customerOffer,
  downPayment,
  numberOfPayments,
  onPreview,
  onDownPaymentChange,
  onNumPaymentChange,
  onSubmitOffer,
}: offerFormProps) => {
  const offerDate = new Date(customerOffer.offerDate);

  return (
    <form className={styles.form} onSubmit={onPreview}>
      <div>
        <label>Date: </label>
        <input
          disabled
          placeholder={`${
            offerDate.getMonth() + 1
          }/${offerDate.getDate()}/${offerDate.getFullYear()}`}
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
          max={customerOffer.carTotal}
          value={downPayment}
          onChange={(e) => onDownPaymentChange(e.target.value)}
        />
        <label># of Payments</label>
        <input
          required
          type='number'
          min={1}
          max={120}
          value={numberOfPayments}
          onChange={(e) => onNumPaymentChange(e.target.value)}
          className={styles.numberPaymentsInput}
        />
      </div>
      <div className={styles.lowerContainer}>
        <div className={styles.buttonContainer}>
          <button>Preview</button>
          <button type='button' onClick={onSubmitOffer}>
            Submit
          </button>
        </div>
      </div>
      {error && (
        <div>
          <p className={styles.errorText}>
            An error occurred when processing your offer.
          </p>
          <p className={styles.errorDirections}>
            Please try submitting your request again.{' '}
          </p>
        </div>
      )}
    </form>
  );
};

export default OfferForm;
