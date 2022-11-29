import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  ArrowLeftCircleIcon,
  HandThumbUpIcon,
} from "react-native-heroicons/solid";
import Set from "../components/Set";
import { useDispatch } from "react-redux";
import { completeWorkout } from "../redux/firebaseCalls";
import { AuthContext } from "../context/AuthContext";
import { useKeepAwake } from "expo-keep-awake";

const TrackWorkoutScreen = ({ navigation, route }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { workout } = route.params;
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const timer = () => {
      !modalVisible && setSeconds(seconds + 1);
    };
    if (seconds === 60) {
      setMinutes(minutes + 1);
      setSeconds(0);
    }
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const exitAlert = () =>
    Alert.alert("Exit Workout", "Are you sure you want to exit this workout?", [
      {
        text: "Cancel",
      },
      {
        text: "Exit",
        onPress: () => navigation.navigate("Home"),
      },
    ]);

  const handleFinishWorkout = () => {
    const updatedWorkout = { ...workout, workoutLength: { seconds, minutes } };
    completeWorkout(dispatch, updatedWorkout, currentUser.uid);
    setModalVisible(true);
    setTimeout(() => navigation.navigate("Home"), 3000);
  };

  useKeepAwake();
  return (
    <>
      <SafeAreaView className="bg-sky-50 flex-1">
        <View className="items-center justify-center relative mb-3">
          <Text className="text-4xl text-slate-600 m-2  font-bold">
            {workout.title}
          </Text>
          <Text className="text-base text-gray-500">
            Workout Time:{" "}
            {`${minutes > 9 ? minutes : `0${minutes}`}:${
              seconds > 9 ? seconds : `0${seconds}`
            }`}
          </Text>
        </View>
        <View className="bg-white flex-1">
          <ScrollView>
            {workout.exercises.map((exercise) => (
              <View key={exercise._id}>
                <View className="pl-3 py-2 border-solid border-b-2 border-slate-200">
                  <Text className="text-2xl">{exercise.title}</Text>
                  <Text className="text-base text-gray-500">
                    {exercise.sets.length} sets
                  </Text>
                </View>
                {exercise.sets.map((set) => (
                  <Set key={set.number} set={set} trackWorkout={true} />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
        <View className="h-20 items-center justify-center flex-row space-x-5">
          <TouchableOpacity
            onPress={exitAlert}
            className="bg-red-900 w-36 justify-center items-center rounded-md"
          >
            <Text className="py-2 text-gray-100 text-lg">Exit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFinishWorkout()}
            className="bg-sky-900 w-36 justify-center items-center rounded-md"
          >
            <Text className="py-2 text-gray-100 text-lg">Finish Workout</Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View className="h-10 items-center justify-center flex-1">
            <View className="bg-sky-600 h- h-52 w-3/4 rounded-lg items-center justify-center space-y-1">
              <View className="flex-row items-center space-x-2">
                <Text className="text-gray-100 text-2xl text-center">
                  Nice Job!
                </Text>
                <HandThumbUpIcon size={30} color="beige" />
              </View>
              <Text className="text-base text-gray-200">
                Workout Time:{" "}
                {`${minutes > 9 ? minutes : `0${minutes}`}:${
                  seconds > 9 ? seconds : `0${seconds}`
                }`}
              </Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default TrackWorkoutScreen;
