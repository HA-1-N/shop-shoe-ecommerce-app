import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';

const AuthStack = createStackNavigator();

const NavigationAuth = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

export default NavigationAuth