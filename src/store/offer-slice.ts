import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../models/offer';

const offerSlice = createSlice({
  name: 'offer',
  initialState: {
    decision: '',
    decisionCount: 0,
    submittedOffer: [] as Offer[],
    previousOffers: [] as Offer[],
    pendingOffers: [] as Offer[],
    processedOffers: [] as Offer[],
  },
  reducers: {
    setDecision(state, action: PayloadAction<string>) {
      state.decision = action.payload;
    },
    incrementDecisionCount(state){
        state.decisionCount++;
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
  },
});

export const offerActions = offerSlice.actions;

export default offerSlice.reducer;
