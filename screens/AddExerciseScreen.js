import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import AddSet from "../components/AddSet";
import { v4 as uuid } from "uuid";

// Hide that keyboard!
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const AddExerciseScreen = ({ route, navigation }) => {
  const { setExercises, exercises } = route.params;
  const [sets, setSets] = useState([{ number: 1, reps: 0, weight: 0 }]);
  const [title, setTitle] = useState("");

  const addSet = () => {
    setSets([...sets, { number: sets.length + 1, reps: 0, weight: 0 }]);
  };

  const removeSet = () => {
    if (sets.length > 1) {
      setSets(sets.filter((set) => set.number !== sets.length));
    }
  };

  const handleReps = (set, reps) => {
    sets[set - 1].reps = reps;
  };
  const handleWeight = (set, weight) => {
    sets[set - 1].weight = weight;
  };

  const addExercise = () => {
    setExercises([...exercises, { title, sets, _id: uuid() }]);
    navigation.goBack();
  };

  return (
    <DismissKeyboard>
      <View className="flex-1 mb-20">
        <Text className="text-3xl text-center my-4">Add Exercise</Text>
        <ScrollView>
          <View className="mx-3 space-y-10">
            <TextInput
              onChangeText={(text) => setTitle(text)}
              placeholder="Exercise Name"
              className="text-2xl"
            />
            <View className="flex-row items-center justify-between">
              <Text className="text-xl">Number of sets: </Text>
              <View className="flex-row items-center space-x-2 mr-5">
                <TouchableOpacity>
                  <MinusCircleIcon
                    onPress={removeSet}
                    size={35}
                    color="skyblue"
                  />
                </TouchableOpacity>
                <Text className="text-xl">{sets.length}</Text>
                <TouchableOpacity>
                  <PlusCircleIcon onPress={addSet} size={35} color="skyblue" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="my-8">
            {sets.map((set) => (
              <AddSet
                key={set.number}
                set={set}
                handleReps={handleReps}
                handleWeight={handleWeight}
              />
            ))}
          </View>
          <View className="items-center flex-row justify-center space-x-2">
            <TouchableOpacity
              onPress={addExercise}
              className="bg-red-900 w-36 justify-center items-center rounded-md"
            >
              <Text className="py-3 text-gray-100 text-lg">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={addExercise}
              className="bg-sky-900 w-36 justify-center items-center rounded-md"
            >
              <Text className="py-3 text-gray-100 text-lg">Add Exercise</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </DismissKeyboard>
  );
};

export default AddExerciseScreen;
