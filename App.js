import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import HTTP_ADMIN_SERVICE from "./src/utils/configs/axios.config";
import { decrement, increment } from "./src/redux/features/counterSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { setupAxiosInterceptors } from "./src/utils/configs/axios-interceptor";
import NavigationBar from "./src/navigations/NavigationBar";
import NavigationAuth from "./src/navigations/NavigationAuth";
import NavigationProductDetail from "./src/navigations/NavigationProductDetail";
import NavigationCheckout from "./src/navigations/NavigationCheckout";
import EditProfileNavigation from "./src/navigations/EditProfileNavigation";
import ChangePasswordNavigation from "./src/navigations/ChangePasswordNavigation";

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
        <NavigationContainer independent={true}>
          <StatusBar style="auto" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NavigationBar" component={NavigationBar} />
            <Stack.Screen name="NavigationAuth" component={NavigationAuth} />
            <Stack.Screen
              name="NavigationProductDetail"
              component={NavigationProductDetail}
            />
            <Stack.Screen
              name="NavigationCheckout"
              component={NavigationCheckout}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileNavigation}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordNavigation}
            />
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
