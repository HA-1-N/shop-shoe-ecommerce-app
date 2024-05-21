import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import CardOrderItem from "../../components/CardOrderItem";
import { getOrderByUserIdApi } from "../../api/order.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();

  const [orderByUserItems, setOrderByUserItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [count, setCount] = useState(0);

  const getIdLocalStorage = async () => {
    // Add your get id logic here
    try {
      const id = await AsyncStorage.getItem("id");
      setUserId(Number(id));
    } catch (error) {
      console.log("Error getting user id", error);
    }
  };

  useEffect(() => {
    getIdLocalStorage();
  }, []);

  const getOrderByUserId = async () => {
    try {
      const res = await getOrderByUserIdApi(Number(userId));
      setOrderByUserItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderByUserId();
  }, [userId]);

  const handleNavigationOrderDetail = (id) => {
    navigation.navigate("Order Detail", { id: id });
  };

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setCount(count + 1);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }, []);

  return (
    <View>
      <ScrollView
        // contentContainerStyle={{ paddingBottom: 120 }}
        contentInsetAdjustmentBehavior="automatic"
        alwaysBounceVertical={true}
        snapToEnd={true}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <View>
          {orderByUserItems?.map((item, index) => (
            <CardOrderItem
              key={index}
              orderID={item?.id}
              orderDate={item?.orderDate}
              orderStatus={item?.orderStatus?.status}
              shippingMethod={item?.shippingMethod?.method}
              orderTotal={item?.orderTotal}
              handleNavigationOrderDetail={handleNavigationOrderDetail}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderScreen;
