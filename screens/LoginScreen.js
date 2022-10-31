import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { Keyboard } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

// Hide that keyboard!
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const LoginScreen = ({ navigation }) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (error) {
      const errorMessage = error.message;
      setErr(true);
      setErrorMessage(errorMessage.split(":")[1]);
    }
  };

  return (
    <DismissKeyboard>
      <SafeAreaView className="bg-slate-400 flex-1 items-center justify-center">
        <View className="bg-white py-5 px-5 rounded-md items-center justify-center space-y-3 mb-48">
          <View className="items-center justify-center">
            <Text className="text-3xl font-bold text-slate-600">
              Workout Planner
            </Text>
            <Text className="text-gray-500 text-base">Login</Text>
          </View>
          <View className="text-base bg-slate-100 w-72 rounded-md py-3 px-4">
            <TextInput
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Email"
            />
          </View>
          <View className="text-base bg-slate-100 w-72 rounded-md py-3 px-4 flex-row justify-between relative">
            <View className="flex-1">
              <TextInput
                onChangeText={(text) => setPassword(text)}
                textContentType="password"
                secureTextEntry={isSecureEntry}
                placeholder="Password"
                keyboardType="default"
                icon={<Text>Show</Text>}
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
            className="bg-sky-800 rounded-md w-32 items-center"
          >
            <Text className="text-base text-white py-2">Login</Text>
          </TouchableOpacity>
          {err && (
            <Text className="text-red-500 text-xs">
              {errMessage
                ? errMessage
                : "Oops something went wrong! Try again."}
            </Text>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-sm text-gray-500">
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default LoginScreen;
