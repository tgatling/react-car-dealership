import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../models/offer';

const offerSlice = createSlice({
  name: 'offer',
  initialState: {
    carOffers: [] as { carId: string; offerId: string; status: string }[],
    submittedOffer: [] as Offer[],
    previousOffers: [] as Offer[],
    pendingOffers: [] as Offer[],
    processedOffers: [] as Offer[],
  },
  reducers: {
    setCarOffers(
      state,
      action: PayloadAction<
        { carId: string; offerId: string; status: string }[]
      >
    ) {
      console.log(action.payload);
      state.carOffers = action.payload;
    },
    setSubmittedOffer(state, action: PayloadAction<Offer[]>) {
      state.submittedOffer = action.payload;
    },
    setPreviousOffers(state, action: PayloadAction<Offer[]>) {
      state.previousOffers = action.payload;
    },
    setPendingOffers(state, action: PayloadAction<Offer[]>) {
      state.pendingOffers = action.payload;
    },
    setProcessedOffers(state, action: PayloadAction<Offer[]>) {
      state.processedOffers = action.payload;
    },
    addOffer(state, action: PayloadAction<Offer>) {
      state.carOffers.push(action.payload);
    },
  },
});

export const offerActions = offerSlice.actions;

export default offerSlice.reducer;
