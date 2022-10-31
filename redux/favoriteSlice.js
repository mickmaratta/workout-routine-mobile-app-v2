import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    favoriteStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    favoriteFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //GET ALL
    getFavoritesSuccess: (state, action) => {
      state.isFetching = false;
      state.favorites = action.payload;
    },

    //ADD FAVORITE
    addFavoriteSuccess: (state, action) => {
      state.isFetching = false;
      state.favorites = [...state.favorites, action.payload];
    },

    //REMOVE FAVORITE
    removeFavoriteSuccess: (state, action) => {
      state.isFetching = false;
      state.favorites = state.favorites.filter(favoriteWorkout => favoriteWorkout._id !== action.payload._id)
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  favoriteStart,
  favoriteFailure,
  getFavoritesSuccess,
  addFavoriteSuccess,
  removeFavoriteSuccess,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
