import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../models/message';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    unread: 0,
    inbox: [] as Message[],
    outbox: [] as Message[],
    trash: [] as Message[],
    other: [] as Message[],
  },
  reducers: {
    setMessages(
      state,
      action: PayloadAction<{ messages: Message[]; currentUser: string }>
    ) {
      state.unread = 0;

      action.payload.messages.forEach((message) => {
        if (message.read === false) {
          state.unread++;
        }
        if (message.trash === true) {
          state.trash.push(message);
          //   newTrash.push(message);
        } else if (message.recipientId === action.payload.currentUser) {
          state.inbox.push(message);
          //   newInbox.push(message);
        } else if (message.senderId === action.payload.currentUser) {
          state.outbox.push(message);
          //   newOutbox.push(message);
        } else {
          state.other.push(message);
          //   newOther.push(message);
        }
      });
    },
    addToOutbox(state, action: PayloadAction<{ message: Message }>) {
      state.outbox.push(action.payload.message);
    },
    addToInbox(state, action: PayloadAction<{ message: Message }>) {
      state.outbox.push(action.payload.message);
    },
    trashMessage(state, action: PayloadAction<{ message: Message }>) {
      let id = action.payload.message.msgId;
      // remove from inbox or outbox
      let newInbox = state.inbox.filter((message) => message.msgId !== id);
      state.inbox = newInbox;

      let newOutbox = state.outbox.filter((message) => message.msgId !== id);
      state.outbox = newOutbox;

      // add to trash
      state.trash.push(action.payload.message);
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
