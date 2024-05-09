import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileScreen from "../screens/profile/ProfileScreen";

const EditProfileNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Edit Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default EditProfileNavigation;
