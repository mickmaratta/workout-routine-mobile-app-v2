import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  addFavoriteSuccess,
  favoriteFailure,
  favoriteStart,
  getFavoritesSuccess,
  removeFavoriteSuccess,
} from "./favoriteSlice";

import {
  addWorkoutsSuccess,
  completeWorkoutSuccess,
  deleteWorkoutSuccess,
  getWorkoutsSuccess,
  updateWorkoutSuccess,
  workoutFailure,
  workoutStart,
} from "./workoutSlice";

//GET WORKOUTS
export const getWorkouts = async (dispatch, uid) => {
  dispatch(workoutStart());
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    dispatch(getWorkoutsSuccess(docSnap.data().workouts));
  } catch (error) {
    console.log(error);
    dispatch(workoutFailure());
  }
};

//GET FAVORITE WORKOUTS
export const getFavorites = async (dispatch, uid) => {
  dispatch(favoriteStart());
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    dispatch(getFavoritesSuccess(docSnap.data().favoriteWorkouts));
  } catch (error) {
    console.log(error);
    dispatch(favoriteFailure());
  }
};

//ADD WORKOUT
export const addWorkout = async (dispatch, workout, uid) => {
  dispatch(workoutStart());
  try {
    //Add to Workouts Collection
    await setDoc(doc(db, "workouts", workout._id), {
      ...workout,
      _createdAt: new Date(),
    });

    //Update user
    await updateDoc(doc(db, "users", uid), {
      workouts: arrayUnion(workout),
    });

    dispatch(addWorkoutsSuccess(workout));
  } catch (error) {
    console.log(error);
    dispatch(workoutFailure());
  }
};

//UPDATE WORKOUT
export const updateWorkout = async (dispatch, updatedWorkout, workout, uid) => {
  dispatch(workoutStart());
  try {
    //Update Workouts Collection
    await updateDoc(doc(db, "workouts", updatedWorkout._id), {
      ...updatedWorkout,
      _updatedAt: new Date(),
    });

    //Update user
    await updateDoc(doc(db, "users", uid), {
      workouts: arrayRemove(workout),
      favoriteWorkouts: arrayRemove(workout),
    });
    await updateDoc(doc(db, "users", uid), {
      workouts: arrayUnion(updatedWorkout),
    });
    
    dispatch(removeFavoriteSuccess(workout));
    dispatch(updateWorkoutSuccess(updatedWorkout));
  } catch (error) {
    console.log(error);
    dispatch(workoutFailure());
  }
};

//DELETE WORKOUT
export const deleteWorkout = async (dispatch, workout, uid) => {
  dispatch(workoutStart());
  try {
    //Update user workouts
    await updateDoc(doc(db, "users", uid), {
      workouts: arrayRemove(workout),
      favoriteWorkouts: arrayRemove(workout),
    });

    //Delete workout
    await deleteDoc(doc(db, "workouts", workout._id))

    dispatch(deleteWorkoutSuccess(workout));
    dispatch(removeFavorite(workout));
  } catch (error) {
    console.log(error);
    dispatch(workoutFailure());
  }
};

//ADD FAVORITE
export const addFavorite = async (dispatch, workout, uid) => {
  dispatch(favoriteStart());
  try {
    //Update user workouts
    await updateDoc(doc(db, "users", uid), {
      favoriteWorkouts: arrayUnion(workout),
    });

    dispatch(addFavoriteSuccess(workout));
  } catch (error) {
    console.log(error);
    dispatch(favoriteFailure());
  }
};

//REMOVE FAVORITE
export const removeFavorite = async (dispatch, workout, uid) => {
  dispatch(favoriteStart());
  try {
    //Update user
    await updateDoc(doc(db, "users", uid), {
      favoriteWorkouts: arrayRemove(workout),
    });

    dispatch(removeFavoriteSuccess(workout));
  } catch (error) {
    console.log(error);
    dispatch(favoriteFailure());
  }
};

//COMPLETE WORKOUT
export const completeWorkout = async (dispatch, workout, uid) => {
  dispatch(workoutStart());
  try {
    //Update user workouts
    await updateDoc(doc(db, "users", uid), {
      completedWorkouts: arrayUnion({...workout, date: new Date()}),
    });

    dispatch(completeWorkoutSuccess(workout));
  } catch (error) {
    console.log(error);
    dispatch(workoutFailure());
  }
};