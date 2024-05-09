import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { Text, View } from 'react-native'
import ChangePasswordScreen from '../screens/change-password/ChangePasswordScreen';

const ChangePasswordNavigation = () => {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}

export default ChangePasswordNavigation