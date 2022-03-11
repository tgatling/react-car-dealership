import React, {useState} from 'react';
import { Offer } from '../models/offer';
import offerService from '../services/offer.service';

const useDealer= (empUserId: string) => {
    let response;
    let dealerOffers: {carId: string, status: string}[] = []

    offerService.getAllOffers().then(response => {
        for(const key in response){
            if(response[key].empUserId === empUserId){
                dealerOffers.push({
                    carId: response[key].carId,
                    status: response[key].status,
                })
            }
        }
        response = {
            dealerOffers,
            error: null,
        }
    }).catch(error => {
        response = {
            dealerOffers: null,
            error,
        }
    })

    return response;
};

export default useDealer;