import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from "./workoutSlice";
import favoriteReducer from "./favoriteSlice";

export default configureStore({
  reducer: {
    workout: workoutReducer,
    favorite: favoriteReducer
  }
})