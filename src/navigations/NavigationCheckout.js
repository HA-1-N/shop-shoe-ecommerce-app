import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { Text, View } from 'react-native'
import CheckourScreen from '../screens/checkout/CheckoutScreen';

const CheckoutStack = createStackNavigator();

const NavigationCheckout = () => {
  return (
    <CheckoutStack.Navigator>
      <CheckoutStack.Screen name="Checkout" component={CheckourScreen} />
    </CheckoutStack.Navigator>
  );
}

export default NavigationCheckout