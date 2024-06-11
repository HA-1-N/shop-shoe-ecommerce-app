import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderScreen from '../screens/order/OrderScreen';
import OrderDetailScreen from '../screens/order/OrderDetailScreen';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
// import OrderDetailsScreen from '../screens/OrderDetailsScreen';

// Import your order screens here

const Stack = createStackNavigator();

const CustomReturn = () => {

    const navigation = useNavigation();

    return (
      <Icon
        name="arrow-back"
        size={25}
        color="#fff"
        padding={10}
        onPress={() => navigation.navigate("Setting")}
      />
    );

}

const OrderNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{
            title: "Orders",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => <CustomReturn />,
          }}
        />
        <Stack.Screen name="Order Detail" component={OrderDetailScreen} />
      </Stack.Navigator>
    );
};

export default OrderNavigation;