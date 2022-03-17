import React, { useEffect, useState } from 'react';
import { Offer } from '../../../models/offer';
import OfferItem from './OfferItem';
import styles from './OfferDisplay.module.css';
import AcceptanceConfirmation from './AcceptanceConfirmation';
import RejectionConfirmation from './RejectionConfirmation';
import { useSelector, RootStateOrAny } from 'react-redux';
import {useLocation} from 'react-router-dom';
import {CUSTOMER_OFFERS} from '../../../models/constants';

interface displayProps {
  mainHeader?: string;
  targetHeader?: string;
  offersHeader?: string;
}

const OfferDisplay = ({
  mainHeader,
  targetHeader,
  offersHeader,
}: displayProps) => {
  const [decision, setDecision] = useState('');
  const [offer, setOffer] = useState<Offer>(new Offer());
  const location = useLocation()

  const { pendingOffers, processedOffers, submittedOffer, previousOffers } = useSelector(
    (state: RootStateOrAny) => state.offer
  );

  let targetOffers: Offer[] = [];
  let otherOffers: Offer[] = [];

  if(location.pathname === CUSTOMER_OFFERS){
    targetOffers = pendingOffers;
    otherOffers = processedOffers;
  } else {
    targetOffers.push(submittedOffer);
    otherOffers = previousOffers;
  }


  useEffect(() => {
    // check to see if component re-renders after offer status is changed
  }, [offer.status]);

  const submittedHandler = (accepted: boolean, offer: Offer) => {
    console.log(`submit handler`);
    console.log(`accepted: ${accepted}`);
    console.log(offer);
    if (accepted) {
      setDecision('ACCEPTED');
    } else {
      setDecision('REJECTED');
    }
    console.log(decision);
    setOffer(offer);
  };

  return (
    <div className={styles.displayContainer}>
      <h1>{mainHeader}</h1>

      {decision === 'ACCEPTED' && <AcceptanceConfirmation offer={offer} />}
      {decision === 'REJECTED' && <RejectionConfirmation offer={offer} />}

      {targetOffers && targetOffers.length > 0 && (
        <div>
          <h2>{targetHeader}</h2>
          {targetOffers.map((targetOffer: Offer) => {
            return (
              <OfferItem
                key={targetOffer.offerId}
                offer={targetOffer}
                submitHandler={submittedHandler}
              />
            );
          })}
        </div>
      )}
      {otherOffers.length > 0 && (
        <div>
          <h2>{offersHeader}</h2>
          {otherOffers.map((offer: Offer) => {
            return (
              <OfferItem
                key={offer.offerId}
                offer={offer}
                submitHandler={submittedHandler}
              />
            );
          })}
        </div>
      )}
      {!targetOffers && otherOffers.length === 0 && (
        <p>There are currently no offers to display.</p>
      )}
    </div>
  );
};

export default OfferDisplay;
