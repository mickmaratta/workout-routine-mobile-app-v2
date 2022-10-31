import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { ArrowLeftCircleIcon } from "react-native-heroicons/solid";
import Set from "../components/Set";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch } from "react-redux";
import { deleteWorkout } from "../redux/firebaseCalls";
import { AuthContext } from "../context/AuthContext";

const ViewWorkoutScreen = ({ route, navigation }) => {
  const switchOptions = [
    { label: "Collapsed", value: "collapsed" },
    { label: "Expanded", value: "expanded" },
  ];
  const dispatch = useDispatch();
  const { workout } = route.params;
  const { currentUser } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(true);

  const handleDelete = () => {
    deleteWorkout(dispatch, workout, currentUser.uid);
    navigation.navigate("Home");
  }
  const deleteAlert = () => (
    Alert.alert(
      "Delete workout",
      "Are you sure you want to delete this workout?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDelete()
        }
      ]
    )
  )

  return (
    <SafeAreaView className="bg-sky-50 flex-1">
      <View className="items-center justify-center relative mb-3">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="absolute top-3 left-2"
        >
          <ArrowLeftCircleIcon size={35} color="skyblue" />
        </TouchableOpacity>
        <Text className="text-4xl text-slate-600 m-2  font-bold">
          {workout.title}
        </Text>
        <Text className="text-base text-gray-500">{workout.desc}</Text>
        <View className="w-40 mt-3">
          <SwitchSelector
            initial={0}
            options={switchOptions}
            textColor="black"
            selectedColor="black"
            buttonColor="skyblue"
            borderColor="skyblue"
            height={30}
            onPress={() => setCollapsed(!collapsed)}
          />
        </View>
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
              {!collapsed &&
                exercise.sets.map((set) => <Set key={set.number} set={set} />)}
            </View>
          ))}
        </ScrollView>
      </View>
      <View className="h-20 items-center justify-center flex-row space-x-5">
          <TouchableOpacity
            onPress={deleteAlert}
            className="bg-red-900 w-20 justify-center items-center rounded-md"
          >
            <Text className="py-2 text-gray-100 text-lg">Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Track_Workout", {workout})}
            className="bg-sky-900 w-32 justify-center items-center rounded-md"
          >
            <Text className="py-3 text-gray-100 text-lg">Track</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Edit", {workout})}
            className="bg-green-900 w-20 justify-center items-center rounded-md"
          >
            <Text className="py-2 text-gray-100 text-lg">Edit</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default ViewWorkoutScreen;
