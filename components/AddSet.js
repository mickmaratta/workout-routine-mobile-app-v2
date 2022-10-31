import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";

const Set = ({ set, handleReps, handleWeight }) => {
  return (
    <View className="flex-row items-center justify-between px-6 py-2 bg-slate-200 mb-1">
      <Text className="text-lg font-bold">{set.number}</Text>
      <View className="bg-slate-200 rounded-md "> 
        <TextInput onChangeText={(value) => handleReps(set.number, value)} placeholder={set.reps ? set.reps : "Reps"} textAlign="center" className="text-lg mx-2 mb-2 w-20" keyboardType="number-pad"/>
      </View>
      <View className="flex-row space-x-2 items-center">
        <View className="bg-slate-200 rounded-md ">
          <TextInput onChangeText={(value) => handleWeight(set.number, value)} placeholder={set.weight ? set.weight : "Weight"} className="text-lg mx-2 mb-2 w-20" keyboardType="number-pad"/>
        </View>
        <Text className="text-lg">lbs</Text>
      </View>
    </View>
  );
};

export default Set;
