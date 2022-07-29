import React from 'react';
import {useParams} from 'react-router-dom';

/**
 * Make Payment Component
 * @return
 */
const MakePayment = () => {
  // get the user id for which the payment history will be displayed
  const params = useParams<{ billId: string }>();
  
  return (
    <div>
      <p>{`Make a Payment on Bill ${params.billId}`}</p>
    </div>
  );
};

export default MakePayment;
