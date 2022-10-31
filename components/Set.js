import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { CheckCircleIcon } from "react-native-heroicons/outline";
import { CheckCircleIcon as CheckCirleIconSolid } from "react-native-heroicons/solid";

const Set = ({ set, trackWorkout = false }) => {
  const [done, setDone] = useState(false);

  return (
    <Pressable
      className={
        done
          ? "flex-row items-center justify-between px-6 py-2 bg-green-200 mb-1"
          : "flex-row items-center justify-between px-6 py-2 bg-slate-200 mb-1"
      }
    >
      <Text className="text-lg font-bold mx-2">{set.number}</Text>
      <View className="flex-row">
        <Text className="text-lg">Reps: </Text>
        <Text className="text-lg">{set.reps}</Text>
      </View>
      <View className="flex-row">
        <Text className="text-lg pr-1">
          {+set.weight === 0 ? "--" : set.weight}
        </Text>
        {+set.weight !== 0 && <Text className="text-lg">lbs</Text>}
      </View>
      {trackWorkout && (
        <TouchableOpacity onPress={() => setDone(!done)} className="mr-2">
          {done ? (
            <CheckCirleIconSolid size={40} color="darkgreen" />
          ) : (
            <CheckCircleIcon size={40} color="darkgreen" />
          )}
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default Set;
