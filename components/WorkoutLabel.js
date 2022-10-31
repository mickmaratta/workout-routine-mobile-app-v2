import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { HeartIcon } from "react-native-heroicons/outline";
import { HeartIcon as HeartIconSolid, MinusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { addFavorite, removeFavorite } from "../redux/firebaseCalls";
import { useNavigation } from "@react-navigation/native"; 

const WorkoutLabel = ({ workout, all, }) => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const favorites = useSelector((state) => state.favorite.favorites);

  const navigation = useNavigation();

  const handleAddFavorite = () => {
    addFavorite(dispatch, workout, currentUser.uid);
  };

  const handleRemoveFavorite = () => {
    removeFavorite(dispatch, workout, currentUser.uid);
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('View_Workout', {workout})} className=" flex-row items-center justify-between mx-3 py-2 border-solid border-b-2 border-gray-200">
      <View>
        <Text className="text-3xl text-slate-700">{workout.title}</Text>
        <Text className="text-sm text-gray-500">{workout.desc}</Text>
      </View>
      {all ?
        (!favorites.some((fav) => fav._id === workout._id) ? (
          <TouchableOpacity onPress={handleAddFavorite} className="mr-3">
            <HeartIcon size={30} color="crimson" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleRemoveFavorite} className="mr-3">
            <HeartIconSolid size={30} color="crimson" />
          </TouchableOpacity>
        )) :
        <TouchableOpacity>
          <MinusCircleIcon onPress={handleRemoveFavorite} size={30} color="crimson" className="mr-3" />
        </TouchableOpacity>
        }
    </TouchableOpacity>
  );
};

export default WorkoutLabel;
