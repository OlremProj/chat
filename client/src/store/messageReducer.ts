import { createSlice } from "@reduxjs/toolkit";

export interface IMessageStore {
  messages: { userId: string; username: string; text: string }[];
}

export const messageSlice = createSlice({
  name: "user",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setMessages } = messageSlice.actions;

export default messageSlice.reducer;
