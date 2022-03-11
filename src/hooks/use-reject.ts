// import React, {useState} from 'react';
// import { Offer, REJECTED_STATUS } from '../models/offer';
import offerService from '../services/offer.service';

const useReject =(carId: string, offerId: string) => {
    let response;
    offerService.getAllOffers().then(response => {
        response = {success: true, error: null};
    }).catch(error => {
        response = {success: false, error};
    })

    console.log(response);
    return response;
};

export default useReject;