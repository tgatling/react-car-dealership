import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';

import useStatus from '../../../hooks/use-status';
import useReject from '../../../hooks/use-reject';
import { REJECTED_STATUS } from '../../../models/offer';
import { Offer } from '../../../models/offer';

interface Props {
  offer: Offer;
}

const RejectionConfirmation = ({ offer }: Props) => {
    let changeStatusResponse;
  
    const currentUser = useSelector(
      (state: RootStateOrAny) => state.user.currentUser
    );
    const userId = JSON.parse(currentUser).userId;
  
    changeStatusResponse = useStatus(offer, REJECTED_STATUS, userId);
  
    console.log(changeStatusResponse);
  
    return (
      <div>
        <p>Reject</p>
      </div>
    );
};

export default RejectionConfirmation;