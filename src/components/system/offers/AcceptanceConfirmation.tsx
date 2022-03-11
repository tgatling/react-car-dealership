import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';

import useStatus from '../../../hooks/use-status';
import useReject from '../../../hooks/use-reject';
import { ACCEPTED_STATUS } from '../../../models/offer';
import {Offer} from '../../../models/offer';

interface Props {
    offer: Offer;
}

const AcceptanceConfirmation = ({offer}: Props) => {
    let changeStatusResponse;
    let rejectAllOthersResponse;

    const currentUser = useSelector(
        (state: RootStateOrAny) => state.user.currentUser
      );
      const userId = JSON.parse(currentUser).userId;
    

      changeStatusResponse = useStatus(offer, ACCEPTED_STATUS, userId);
      rejectAllOthersResponse = useReject(
        offer.carId,
        offer.offerId)


    return (
        <div>
            
        </div>
    );
};

export default AcceptanceConfirmation;