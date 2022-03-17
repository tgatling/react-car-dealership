import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Offer } from '../models/offer';

const offerSlice = createSlice({
    name: 'offer',
    initialState: {
        targetOffers: [] as Offer[],
        offers: [] as Offer[],
    },
    reducers: {
        setTargetOffers(state, action: PayloadAction<{targetOffers: Offer[]}>){
            state.targetOffers = action.payload.targetOffers;
        },
        setOffers(state, action: PayloadAction<{offers: Offer[]}>){
            state.offers = action.payload.offers;
        }
    }
});

export const offerActions = offerSlice.actions;

export default offerSlice.reducer;