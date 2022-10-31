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
import { addWorkout, updateWorkout } from "../redux/firebaseCalls";
import { useDispatch } from "react-redux";
import { Timestamp } from "firebase/firestore";

// Hide that keyboard!
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const EditWorkoutScreen = ({navigation, route}) => {
  const { workout } = route.params;
  const { currentUser } = useContext(AuthContext);
  const [exercises, setExercises] = useState(workout.exercises);
  const [inputs, setInputs] = useState({ title: workout.title, desc: workout.desc });
  const dispatch = useDispatch()

  const exitAlert = () => (
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
        }
      ]
    )
  )

  const deleteExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise._id !== id));
  };

  const clearInputs = () => {
    setExercises([]);
    setInputs({ title: "", desc: "" });
  }

  const handleUpdateWorkout = async () => {
    const updatedWorkout = {...workout, title: inputs.title, desc: inputs.desc, exercises}
    updateWorkout(dispatch, updatedWorkout, workout, currentUser.uid)
    navigation.navigate("Home")
  };


  return (
    <DismissKeyboard>
    <SafeAreaView className="bg-sky-50 flex-1 w-full">
      <View className="items-center justify-center relative mb-3">
        <Text className="text-4xl text-slate-600 m-2  font-bold">
          Edit Workout
        </Text>
      </View>
      <View className="bg-white flex-1 pb-3">
        <ScrollView>
          <View className="m-3">
            <TextInput
              onChangeText={(text) => setInputs({ ...inputs, title: text })}
              placeholder="Workout title"
              keyboardType="default"
              className="text-3xl w-screen italic text-gray-400"
              value={inputs.title}
            />
          </View>
          <View className="m-3">
            <TextInput
              onChangeText={(text) => setInputs({ ...inputs, desc: text })}
              placeholder="Workout description"
              keyboardType="default"
              className="text-base w-screen italic text-gray-400"
              value={inputs.desc}
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
          onPress={handleUpdateWorkout}
          className="bg-sky-900 w-36 justify-center items-center rounded-md"
        >
          <Text className="py-2 text-gray-100 text-lg">Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </DismissKeyboard>
);
}

export default EditWorkoutScreen