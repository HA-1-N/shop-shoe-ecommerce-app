import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import ProductDetailScreen from '../screens/product-detail/ProductDetailScreen';
import { useRoute } from '@react-navigation/native';

const DetailStack = createStackNavigator();

const NavigationProductDetail = ({ navigator }) => {
  const route = useRoute();

  return (
    <DetailStack.Navigator>
      <DetailStack.Screen
        name="Product Detail"
        component={ProductDetailScreen}
        initialParams={{ id: route.params.id }}
      />
    </DetailStack.Navigator>
  );
};

export default NavigationProductDetail