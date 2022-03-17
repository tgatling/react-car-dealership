import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Offer } from '../models/offer';

const offerSlice = createSlice({
    name: 'offer',
    initialState: {
        submittedOffer: {} as Offer,
        previousOffers: [] as Offer[],
        pendingOffers: [] as Offer[],
        processedOffers: [] as Offer[],
    },
    reducers: {
        setSubmittedOffer(state, action: PayloadAction<{submittedOffer: Offer}>){
            state.submittedOffer = action.payload.submittedOffer;
        },
        setPreviousOffers(state, action: PayloadAction<{previousOffers: Offer[]}>){
            state.previousOffers = action.payload.previousOffers;
        },
        setPendingOffers(state, action: PayloadAction<{pendingOffers: Offer[]}>){
            state.pendingOffers = action.payload.pendingOffers;
        },
        setProcessedOffers(state, action: PayloadAction<{processedOffers: Offer[]}>){
            state.processedOffers = action.payload.processedOffers;
        },
    }
});

export const offerActions = offerSlice.actions;

export default offerSlice.reducer;