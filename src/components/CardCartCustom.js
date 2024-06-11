import React, { useCallback, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../utils/common/color.ultil";
import { updateCartItemApi } from "../api/cart.api";

const CardCartCustom = ({
  image,
  productId,
  productName,
  cartItemId,
  price,
  quantity,
  color,
  size,
  handleNavigateProductDetail,
  handleRemoveCartItem,
  userId,
  incrementCountCart,
  ...props
}) => {
  const [quantityValue, setQuantityValue] = useState(quantity);

  const onDecrementQuantity = useCallback((value) => {
    if (value === 1) return;
    const newValue = Number(value) - 1;

    const valueUploadChangeQuantity = {
      id: cartItemId,
      productId: productId,
      quantity: newValue,
      userId: Number(userId),
    };

    updateCartItemApi(valueUploadChangeQuantity)
      .then((res) => {
        // console.log("res", res);
        if (res) {
          setQuantityValue(newValue);
          incrementCountCart();
          alert("Cập nhật số lượng thành công");
        }
      })
      .catch((err) => {
        // console.log("err", err);
        alert('Cập nhật số lượng thất bại');
      });
  }, []);

  const onIncrementQuantity = useCallback((value) => {
    const newValue = Number(value) + 1;

    const valueUploadChangeQuantity = {
      id: cartItemId,
      productId: productId,
      quantity: newValue,
      userId: Number(userId),
    };

    updateCartItemApi(valueUploadChangeQuantity)
      .then((res) => {
        // console.log("res", res);
        if (res) {
          setQuantityValue(newValue);
          incrementCountCart();
          alert("Cập nhật số lượng thành công");
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert("Cập nhật số lượng thất bại");
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <TouchableOpacity
          onPress={() => handleNavigateProductDetail(productId)}
        >
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </TouchableOpacity>
        <View>
          <Text>{productName}</Text>
          <Text>Price: {price?.toLocaleString("en-US")} VND </Text>
          <Text>Color: {color} </Text>
          <Text>Size: {size} </Text>
          <View style={styles.wrap}>
            <Text>Quantity: </Text>
            <View style={styles.wrap}>
              <TouchableOpacity
                onPress={() => onDecrementQuantity(quantityValue)}
              >
                <Icon
                  name="remove-circle-outline"
                  size={30}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 10 }}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => onIncrementQuantity(quantityValue)}
              >
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
  },
});

export default CardCartCustom;
