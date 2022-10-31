import { createSlice } from "@reduxjs/toolkit";

export const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [],
    completedWorkouts: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    workoutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    workoutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //GET ALL
    getWorkoutsSuccess: (state, action) => {
      state.isFetching = false;
      state.workouts = action.payload;
    },

    //ADD WORKOUT
    addWorkoutsSuccess: (state, action) => {
      state.isFetching = false;
      state.workouts = [...state.workouts, action.payload];
    },

    //UPDATE WORKOUT
    updateWorkoutSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.workouts.findIndex(
        (workout) => workout._id === action.payload._id
      );
      state.workouts[index] = action.payload;
    },
    //DELETE WORKOUT
    deleteWorkoutSuccess: (state, action) => {
      state.isFetching = false;
      state.workouts = state.workouts.filter(
        (workout) => workout._id !== action.payload._id
      );
    },

    //COMPLETE WORKOUT
    completeWorkoutSuccess: (state, action) => {
      state.isFetching = false;
      state.completedWorkouts = [...state.completedWorkouts, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  workoutStart,
  workoutFailure,
  getWorkoutsSuccess,
  addWorkoutsSuccess,
  updateWorkoutSuccess,
  deleteWorkoutSuccess,
  completeWorkoutSuccess,
} = workoutSlice.actions;

export default workoutSlice.reducer;
