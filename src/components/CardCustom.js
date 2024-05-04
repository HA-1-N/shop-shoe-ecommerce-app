import React from "react";
import { Text, View } from "react-native";

const CardCustom = () => {
  return (
    <View>
      <View>{/* <Image source={require("../assets/imagename.png")} /> */}</View>
      <View>
        <Text>Card Title</Text>
        <Text>Card Description</Text>
      </View>
    </View>
  );
};

export default CardCustom;
