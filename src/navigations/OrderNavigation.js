import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderScreen from '../screens/order/OrderScreen';
import OrderDetailScreen from '../screens/order/OrderDetailScreen';
// import OrderDetailsScreen from '../screens/OrderDetailsScreen';

// Import your order screens here

const Stack = createStackNavigator();

const OrderNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="Order Detail" component={OrderDetailScreen} />
        </Stack.Navigator>
    );
};

export default OrderNavigation;