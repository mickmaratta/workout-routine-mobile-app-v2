import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/solid";
import Exercise from "../components/Exercise";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { addWorkout } from "../redux/firebaseCalls";
import { useDispatch } from "react-redux";
import { Timestamp } from "firebase/firestore";

// Hide that keyboard!
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const AddWorkoutScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [inputs, setInputs] = useState({ title: "", desc: "" });
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const exitAlert = () =>
    Alert.alert(
      "Unsaved Changes",
      "Your changes aren't saved are you sure you want to leave?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Leave",
          onPress: () => navigation.goBack(),
        },
      ]
    );

  const deleteExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise._id !== id));
  };

  const clearInputs = () => {
    setExercises([]);
    setInputs({ title: "", desc: "" });
  };

  const handleAddWorkout = async () => {
    const workoutToAdd = {
      _id: uuid(),
      title: inputs.title,
      desc: inputs.desc,
      exercises,
    };

    try {
      addWorkout(dispatch, workoutToAdd, currentUser.uid);
      clearInputs();
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DismissKeyboard>
      <SafeAreaView className="bg-sky-50 flex-1 w-full">
        <View className="items-center justify-center relative mb-3">
          <Text className="text-4xl text-slate-600 m-2  font-bold">
            New Workout
          </Text>
        </View>
        <View className="bg-white flex-1 pb-3">
          <ScrollView>
            <View className="m-3">
              <TextInput
                onChangeText={(text) => setInputs({ ...inputs, title: text })}
                placeholder="Workout title"
                keyboardType="default"
                className="text-3xl w-screen"
              />
            </View>
            <View className="m-3">
              <TextInput
                onChangeText={(text) => setInputs({ ...inputs, desc: text })}
                placeholder="Workout description"
                keyboardType="default"
                className="text-base w-screen"
              />
            </View>
            {exercises &&
              exercises.map((exercise) => (
                <Exercise
                  key={exercise._id}
                  exercise={exercise}
                  deleteExercise={deleteExercise}
                  setExercises={setExercises}
                  exercises={exercises}
                />
              ))}
            <View className="flex-row items-center mt-2">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Add_Exercise", {
                    setExercises,
                    exercises,
                  })
                }
                className="flex-row items-center m-3 space-x-2"
              >
                <Text className="text-lg">Add Exercise</Text>
                <PlusCircleIcon size={40} color="skyblue" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View className="flex-row space-x-5 h-16 items-center justify-center">
          <TouchableOpacity
            onPress={exitAlert}
            className="bg-red-900 w-36 justify-center items-center rounded-md"
          >
            <Text className="py-2 text-gray-100 text-lg">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddWorkout}
            className="bg-sky-900 w-36 justify-center items-center rounded-md"
          >
            <Text className="py-2 text-gray-100 text-lg">Add Workout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default AddWorkoutScreen;
