import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContextProvider } from "./context/AuthContext";
import Main from "./Main";
import "react-native-get-random-values";
import { Provider } from "react-redux";
import store from "./redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </AuthContextProvider>
  );
}
