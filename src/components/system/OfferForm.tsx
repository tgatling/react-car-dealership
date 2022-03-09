import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Offer } from '../../models/offer';
import { MAKING_AN_OFFER_INSTRUCTIONS } from '../../models/constants';
import styles from './OfferForm.module.css';

const OfferForm = () => {
  let params = useParams<{ carId: string }>();
  let customerOffer = new Offer();
  const currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );
  let user = JSON.parse(currentUser);

  customerOffer.userId = user.userId;
  customerOffer.carId = params.carId;
  customerOffer.offerId = `${user.userId}${params.carId}`;

  console.log(`Customer Offer: 
    userId: ${customerOffer.userId}
    carId: ${customerOffer.carId}
    offerId: ${customerOffer.offerId}`);

  return (
    <div className={styles.formContainer}>
      <p>{MAKING_AN_OFFER_INSTRUCTIONS}</p>
      <form className={styles.form}>
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
            <input disabled value={customerOffer.carTotal}/>
        </div>
      </form>
    </div>
  );
};

export default OfferForm;
