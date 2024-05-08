import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CardCustom = ({handleNavigateProductDetail}) => {
  return (
    <View>
      <TouchableOpacity onPress={handleNavigateProductDetail}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: "https://product.hstatic.net/200000278317/product/y-da-bong-nike-zoom-mercurial-vapor-15-pro-tf-dj5605-300-xanh-la-tim-1_720391bc725f4bf79f30011bcece0cb7_master.jpg",
            }}
          />
        </View>
        <View>
          <Text>Card Title</Text>
          <Text>Card Description</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 1,
  },
});

export default CardCustom;
