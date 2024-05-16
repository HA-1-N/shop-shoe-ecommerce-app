import React from 'react'
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/common/color.ultil';

const CardCartCustom = ({
  productId,
  productName,
  cartItemId,
  price,
  quantity,
  handleNavigateProductDetail,
  handleRemoveCartItem,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <TouchableOpacity
          onPress={() => handleNavigateProductDetail(productId)}
        >
          <Image
            style={styles.image}
            source={{
              uri: "https://product.hstatic.net/200000410665/product/dsc00591_2a3d11abbdeb4df88c43b4eed8d61591.jpg",
            }}
          />
        </TouchableOpacity>
        <View>
          <Text>{productName}</Text>
          <Text>Price: {price?.toLocaleString("en-US")} VND </Text>
          <View style={styles.wrap}>
            <Text>Quantity: </Text>
            <View style={styles.wrap}>
              <TouchableOpacity>
                <Icon
                  name="remove-circle-outline"
                  size={30}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 10 }}>{quantity}</Text>
              <TouchableOpacity>
                <Icon
                  name="add-circle-outline"
                  size={30}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRemoveCartItem(cartItemId)}>
        <Icon name="close-circle-outline" size={20} color={Colors.danger} />
      </TouchableOpacity>
    </View>
  );
};

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
  },
  my10: {
    marginVertical: 10,
  }
});

export default CardCartCustom