import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Keyboard } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

// Hide that keyboard!
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const RegisterScreen = ({ navigation }) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //Update profile
      await updateProfile(res.user, {
        displayName: username,
      });
      //Create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: username,
        email,
        workouts: [],
        favoriteWorkouts: [],
      });

      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      const errorMessage = error.message;
      setErr(true);
      setErrMessage(errorMessage.split(":")[1]);
    }
  };

  return (
    <DismissKeyboard>
      <SafeAreaView className="bg-sky-900 flex-1 items-center justify-center">
        <View className="bg-white py-12 px-5 rounded-md items-center justify-center space-y-3 mb-48">
          <View className="items-center justify-center">
            <Text className="text-3xl font-bold text-slate-600">
              Workout Planner
            </Text>
            <Text className="text-gray-500 text-xl">Register</Text>
          </View>
          <View className="text-base bg-slate-100 w-72 rounded-md py-3 px-4">
            <TextInput
              onChangeText={(text) => setUserName(text)}
              placeholder="Username"
              keyboardType="default"
            />
          </View>
          <View className="text-base bg-slate-100 w-72 rounded-md py-3 px-4">
            <TextInput
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Email"
            />
          </View>
          <View className="bg-slate-100 w-72 rounded-md py-3 px-4 flex-row justify-between relative">
            <View className="flex-1">
              <TextInput
                onChangeText={(text) => setPassword(text)}
                textContentType="password"
                secureTextEntry={isSecureEntry}
                placeholder="Password"
                keyboardType="default"
              />
            </View>
            <TouchableOpacity
              onPress={() => setIsSecureEntry(!isSecureEntry)}
              className="absolute right-1 top-2"
            >
              {isSecureEntry ? (
                <EyeSlashIcon color="lightgrey" />
              ) : (
                <EyeIcon color="lightgrey" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-sky-900 rounded-md w-32 items-center"
          >
            <Text className="text-base py-2 text-white">Register</Text>
          </TouchableOpacity>
          {err && (
            <Text className="text-red-500 text-xs">
              {errMessage
                ? errMessage
                : "Oops something went wrong! Try again."}
            </Text>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="text-sm text-gray-500">
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default RegisterScreen;
