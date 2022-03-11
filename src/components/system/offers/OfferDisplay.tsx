import React, { useEffect, useState } from 'react';
import { Offer } from '../../../models/offer';
import OfferItem from './OfferItem';
import styles from './OfferDisplay.module.css';
import AcceptanceConfirmation from './AcceptanceConfirmation';
import RejectionConfirmation from './RejectionConfirmation';

interface displayProps {
  mainHeader?: string;
  targetHeader?: string;
  offersHeader?: string;
  targetOffers?: Offer[];
  offers: Offer[];
}

const OfferDisplay = ({
  mainHeader,
  targetHeader,
  offersHeader,
  targetOffers,
  offers,
}: displayProps) => {
  const [decision, setDecision] = useState('');
  const [offer, setOffer] = useState<Offer>(new Offer());

  const submittedHandler = (accepted: boolean, offer: Offer) => {
    console.log(`submit handler`);
    console.log(`accepted: ${accepted}`);
    console.log(offer);
    if(accepted){
      setDecision('ACCEPTED')
    } else {
      setDecision('REJECTED')
    }
    console.log(decision);
    setOffer(offer);
  };

  return (
    <div className={styles.displayContainer}>
      <h1>{mainHeader}</h1>

      {decision === 'ACCEPTED' && <AcceptanceConfirmation offer={offer}/>}
      {decision === 'REJECTED' && (
        <RejectionConfirmation offer={offer}/>
      )}

      {targetOffers && targetOffers.length > 0 && (
        <div>
          <h2>{targetHeader}</h2>
          {targetOffers.map((targetOffer) => {
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
      {offers.length > 0 && (
        <div>
          <h2>{offersHeader}</h2>
          {offers.map((offer) => {
            return <OfferItem key={offer.offerId} offer={offer} submitHandler={submittedHandler}/>;
          })}
        </div>
      )}
      {!targetOffers && offers.length === 0 && (
        <p>There are currently no offers to display.</p>
      )}
    </div>
  );
};

export default OfferDisplay;
