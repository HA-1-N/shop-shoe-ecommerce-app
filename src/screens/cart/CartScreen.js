import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import CardCartCustom from '../../components/CardCartCustom';
import { ScrollView } from 'react-native-gesture-handler';

const data = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    quantity: 1,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Product 3",
    price: 300,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Product 3",
    price: 300,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Product 3",
    price: 300,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    name: "Product 3",
    price: 300,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    name: "Product 113",
    price: 300,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
];

const CartScreen = () => {
  return (
    <View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        contentInsetAdjustmentBehavior="automatic"
        alwaysBounceVertical={true}
        snapToEnd={true}
      >
        <View>
          {data.map((item) => (
            <CardCartCustom
              key={item.id}
              productName={item.name}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
            />
          ))}
        </View>
        <View style={styles.wrapBox}>
          <Text style={styles.title}>Total: <Text style={styles.content}>1000$</Text></Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.wrapBox}>
          <Text style={styles.title}>Shipping Fee: <Text style={styles.content}>10$</Text></Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.wrapBox}>
          <Text style={styles.title}>Total Payment: <Text style={styles.content}>1010$</Text></Text>
          <View style={styles.btn}>
            <Button title="Checkout" onPress={() => {}} />
          </View>
        </View>

      </ScrollView>
    </View>
  );
} 

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