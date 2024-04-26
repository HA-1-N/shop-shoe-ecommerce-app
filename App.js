import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import LoginScreen from "./src/screens/login/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/home/HomeScreen";
import RegisterScreen from "./src/screens/register/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import HTTP_ADMIN_SERVICE from "./src/utils/configs/axios.config";
import { decrement, increment } from "./src/redux/features/counterSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { setupAxiosInterceptors } from "./src/utils/configs/axios-interceptor";

const Stack = createStackNavigator();

const actions = bindActionCreators(
  {
    increaseFetch: increment,
    decreaseFetch: decrement,
  },
  store.dispatch,
);

setupAxiosInterceptors(
  () => () => {},
  () => actions.increaseFetch(),
  () => actions.decreaseFetch(),
  HTTP_ADMIN_SERVICE,
);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
  },
});
