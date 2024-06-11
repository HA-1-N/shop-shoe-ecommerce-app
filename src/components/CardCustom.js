import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../utils/common/color.ultil";

const CardCustom = ({ handleNavigateProductDetail, imageUrl, productName, price, id }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavigateProductDetail(id)}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: imageUrl,
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>{productName}</Text>
          <Text style={styles.price}>{price?.toLocaleString("en-US")} VND</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  price: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default CardCustom;
