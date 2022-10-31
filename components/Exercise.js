import { View, Text, TouchableOpacity, TextInput, Pressable } from "react-native";
import React from "react";
import {
  MinusCircleIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PlusIcon,
} from "react-native-heroicons/solid";
import Set from "./Set";
import AddSet from "./AddSet";
import { useNavigation } from "@react-navigation/native";

const Exercise = ({ exercise, deleteExercise, setExercises, exercises }) => {
  const navigation = useNavigation()
  return (
    <View className="mb-3">
      <View className="flex-row items-center ml-3 mb-2 space-x-4">
        <Text className="text-xl">{exercise.title}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Edit_Exercise", {exercise, exercises, setExercises})}
          className="ml-4"
        >
          <PencilSquareIcon size={30} color="skyblue" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteExercise(exercise._id)}
          className="ml-4"
        >
          <MinusCircleIcon size={30} color="crimson" />
        </TouchableOpacity>
      </View>
      {exercise.sets.map((set) => (
        <Set key={set.number} set={set} />
      ))}
    </View>
  );
};

export default Exercise;
