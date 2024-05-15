import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import CardCartCustom from '../../components/CardCartCustom';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCartItemApi } from '../../api/cart.api';

const CartScreen = ({ navigation }) => {

  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);

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

  const getCartItems = async () => {
    // Add your get cart items logic here
    try {
      const response = await getCartItemApi(Number(4));
      setCartItems(response.data);
    } catch (error) {
      console.log("Error getting cart items", error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [userId]);

  const total = cartItems?.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        contentInsetAdjustmentBehavior="automatic"
        alwaysBounceVertical={true}
        snapToEnd={true}
      >
        <View>
          {cartItems.map((item) => (
            <CardCartCustom
              key={item.id}
              productName={item?.product?.name}
              price={item?.product?.price}
              quantity={item?.quantity}
              image={item.image}
            />
          ))}
        </View>

        <View style={styles.wrapBox}>
          <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
            Tổng đơn hàng
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
            {cartItems?.length} products
          </Text>
          <Text style={styles.title}>
            Total: <Text style={styles.content}>{total?.toLocaleString("en-US")} VND</Text>
          </Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.wrapBox}>
          <Text style={styles.title}>
            Total Payment: <Text style={styles.content}>{total?.toLocaleString("en-US")} VND</Text>
          </Text>
          <View style={styles.btn}>
            <Button
              title="Checkout"
              onPress={() => {
                navigation.navigate("NavigationCheckout");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  wrapBox: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    margin: 10,
  },
  title: {
    fontSize: 16,
  },
  content: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btn: {
    // backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    // alignItems: "center",
    marginVertical: 15,
    flex: 1,
  }
});

export default CartScreen