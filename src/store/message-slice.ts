import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../models/message';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    inbox: [] as Message[],
    outbox: [] as Message[],
    trash: [] as Message[],
    other: [] as Message[],
  },
  reducers: {
    setMessage(
      state,
      action: PayloadAction<{ messages: Message[]; currentUser: string }>
    ) {
      action.payload.messages.forEach((message) => {
        // Trash
        // Inbox
        // Outbox
        // Other
      });
    },
    addToOutbox(state, action: PayloadAction<{ message: Message }>) {
      state.outbox.push(action.payload.message);
    },
    addToInbox(state, action: PayloadAction<{ message: Message }>) {
      state.outbox.push(action.payload.message);
    },
    trashMessage() {
      // remove from inbox or outbox
      // change trash to true
    },
    deleteMessage(state, action: PayloadAction<{ id: string }>) {
      const newMessages = state.trash.filter(
        (msg) => msg.msgId !== action.payload.id
      );
      state.trash = newMessages;
    },
    editMessage(
      state,
      action: PayloadAction<{ id: string; message: Message }>
    ) {
      // Messages only editted if not read
      const id = action.payload.id;
      let existingMessage = state.outbox.find(
        (message) => message.msgId === id
      );

      let newMessages = state.outbox.filter((message) => message.msgId !== id);
      if (existingMessage) {
        newMessages.push(action.payload.message);
      }

      state.outbox = newMessages;
    },
  },
});

export const messageActions = messageSlice.actions;

export default messageSlice.reducer;
