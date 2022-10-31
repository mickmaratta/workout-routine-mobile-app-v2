import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import {
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import SwitchSelector from "react-native-switch-selector";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import WorkoutLabel from "../components/WorkoutLabel";
import { getFavorites, getWorkouts } from "../redux/firebaseCalls";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = ({ navigation }) => {
  const switchOptions = [
    { label: "All Workouts", value: "all" },
    { label: "Favorites", value: "favorites" },
  ];
  const [all, setAll] = useState(true);
  const workouts = useSelector((state) => state.workout.workouts);
  const favoriteWorkouts = useSelector((state) => state.favorite.favorites);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getWorkouts(dispatch, currentUser.uid);
    getFavorites(dispatch, currentUser.uid)
  }, []);

  useEffect(() => {
    if (all) {
      setFilteredWorkouts(workouts);
    } else {
      setFilteredWorkouts(favoriteWorkouts);
    }
  }, [all, workouts, favoriteWorkouts]);


  return (
    <SafeAreaView className="bg-sky-50 flex-1">
      <View className="bg-sky-50">
        <View className="items-center justify-center m-3">
          <Text className="text-4xl text-slate-600  font-bold">Workouts</Text>
          <Text className="text-sm italic text-gray-500">
            Hey {currentUser.displayName}
          </Text>
        </View>

        {/* SEARCH */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4 mb-2">
          <View className="flex-row space-x-2 flex-1 bg-slate-200 p-3 rounded-md">
            <MagnifyingGlassIcon color="gray" size={20} />
            <TextInput placeholder="Workouts..." keyboardType="default" />
          </View>
        </View>
      </View>

      {/* BODY */}
      <View className="my-3 mx-8">
        <SwitchSelector
          initial={0}
          options={switchOptions}
          textColor="black"
          selectedColor="black"
          buttonColor="skyblue"
          borderColor="skyblue"
          onPress={() => setAll(!all)}
        />
      </View>

      <ScrollView className="bg-white">
        {filteredWorkouts.map((workout) => (
          <WorkoutLabel key={workout._id} workout={workout} all={all} />
        ))}
      </ScrollView>

      {/* FOOTER */}
      <View className="h-16 bg-sky-50 relative items-center justify-between flex-row px-4">
        <TouchableOpacity onPress={() => signOut(auth)}>
          <ArrowLeftOnRectangleIcon color="skyblue" size={25} />
        </TouchableOpacity>
        <Text className="text-gray-500">{filteredWorkouts.length} Workouts</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Add")}>
          <PencilSquareIcon color="skyblue" size={25} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
