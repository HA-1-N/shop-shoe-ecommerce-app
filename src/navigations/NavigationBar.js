import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeScreen from "../screens/home/HomeScreen";
import SettingScreen from "../screens/setting/SettingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import CartScreen from "../screens/cart/CartScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, ...props }) => {
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      const userId = await AsyncStorage.getItem("id"); 
      if (userId) {
        onPress();
      } else {
        navigation.navigate("NavigationAuth");
      }
    } catch (error) {
      console.error("Failed to get user ID from local storage:", error);
      navigation.navigate("Login");
    }
  };

  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={handlePress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#5859D1",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const NavigationBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Icon
                name="home-outline"
                size={30}
                color={focused ? "#5859D1" : "#748c94"}
              />
              <Text
                style={{ color: focused ? "#5859D1" : "#748c94", fontSize: 12 }}
              >
                Home
              </Text>
            </View>
          ),
        }}
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="cart-outline" size={48} color="#E9446A" />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Icon
                name="settings-outline"
                size={30}
                color={focused ? "#5859D1" : "#748c94"}
              />
              <Text
                style={{ color: focused ? "#5859D1" : "#748c94", fontSize: 12 }}
              >
                Setting
              </Text>
            </View>
          ),
        }}
        name="Setting"
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default NavigationBar;
