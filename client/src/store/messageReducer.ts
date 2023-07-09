import { createSlice } from "@reduxjs/toolkit";

export interface IMessageStore {
  messages: {
    user: { _id: string; userId: string; username: string };
    text: string;
  }[];
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
    addMessages: (state, action) => {
      if (
        !state.messages.some(
          (message: any) => message._id === action.payload._id
        )
      )
        (state as IMessageStore).messages.push(action.payload);
    },
  },
});

export const { setMessages, addMessages } = messageSlice.actions;

export default messageSlice.reducer;
