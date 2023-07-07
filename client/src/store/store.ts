import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import messageReducer from "./messageReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    messages: messageReducer,
  },
});
