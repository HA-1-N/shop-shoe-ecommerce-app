import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import ProductDetailScreen from '../screens/product-detail/ProductDetailScreen';

const DetailStack = createStackNavigator();

const NavigationProductDetail = () => {
  return (
    <DetailStack.Navigator>
      <DetailStack.Screen
        name="Product Detail"
        component={ProductDetailScreen}
      />
    </DetailStack.Navigator>
  );
}

export default NavigationProductDetail