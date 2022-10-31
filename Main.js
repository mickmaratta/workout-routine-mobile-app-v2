import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { useContext } from "react";
import AddWorkoutScreen from "./screens/AddWorkoutScreen";
import AddExerciseScreen from "./screens/AddExerciseScreen";
import ViewWorkoutScreen from "./screens/ViewWorkoutScreen";
import TrackWorkoutScreen from "./screens/TrackWorkoutScreen";
import EditWorkoutScreen from "./screens/EditWorkoutScreen";
import EditExerciseScreen from "./screens/EditExerciseScreen";

const Stack = createNativeStackNavigator();

export default function Main() {
  const { currentUser } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!currentUser ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ presentation: "modal", headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add"
              component={AddWorkoutScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add_Exercise"
              component={AddExerciseScreen}
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="Edit_Exercise"
              component={EditExerciseScreen}
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="Edit"
              component={EditWorkoutScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="View_Workout"
              component={ViewWorkoutScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Track_Workout"
              component={TrackWorkoutScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
