import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import ForgotPasswordScreen from '../screens/forgot-password/ForgotPasswordScreen';
import VerifyOtpEmailScreen from '../screens/verify-otp-email/VerifyOtpEmailScreen';
import ResetPasswordScreen from '../screens/reset-password/ResetPasswordScreen';

const AuthStack = createStackNavigator();

const NavigationAuth = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Verify Email" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="Verify OTP Email" component={VerifyOtpEmailScreen} />
      <AuthStack.Screen name="Reset Password" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  );
}

export default NavigationAuth