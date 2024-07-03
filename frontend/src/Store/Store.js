import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import taskReducer from "./Slices/taskSlice";

const Store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
  },
});

export default Store;
