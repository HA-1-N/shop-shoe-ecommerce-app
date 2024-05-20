import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../utils/common/color.ultil';

const CardOrderDetail = ({
    productName,
    price,
    quantity,
    colorText,
    size,
    ...props
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={{
              uri: "https://product.hstatic.net/200000410665/product/dsc00591_2a3d11abbdeb4df88c43b4eed8d61591.jpg",
            }}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.text}>{productName}</Text>
          <View style={styles.wrap}>
            <Text style={styles.text}>Price: </Text>
            <Text style={styles.textContent}>
              {" "}
              {price?.toLocaleString("en-US")} VND
            </Text>
          </View>
          <View style={styles.wrap}>
            <Text style={styles.text}>Quantity: </Text>
            <Text style={styles.textContent}>{quantity}</Text>
          </View>
          <View style={styles.wrap}>
            <Text style={styles.text}>Color: </Text>
            <Text style={styles.textContent}>{colorText}</Text>
          </View>
          <View style={styles.wrap}>
            <Text style={styles.text}>Size: </Text>
            <Text style={styles.textContent}>{size}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: Colors.white,
  },
  wrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textContent: {
    fontSize: 16,
  },
  my10: {
    marginVertical: 10,
  },
});
  

export default CardOrderDetail