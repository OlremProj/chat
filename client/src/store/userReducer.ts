import { createSlice } from "@reduxjs/toolkit";

export interface IUserStore {
  username: string;
  userId: string;
  usersConnected: [];
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    username: "",
    usersConnected: [],
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUsersConnected: (state, action) => {
      state.usersConnected = action.payload;
    },
  },
});

export const { setUsername, setUserId, setUsersConnected } = userSlice.actions;

export default userSlice.reducer;
