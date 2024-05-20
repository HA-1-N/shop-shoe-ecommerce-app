import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../utils/common/color.ultil';

const OrderStatus = ({status}) => {

    let tagColorBg = '';
    let tagColorText = '';
    let tagColorBorder = '';

    switch (status?.toLocaleLowerCase()) {
      case "pending":
        tagColorBg = "#faad14";
        tagColorText = "#fadb14";
        tagColorBorder = "#ffe58f";
        break;
      case "processing":
        tagColorBg = "#e6f4ff";
        tagColorText = "#1677ff";
        tagColorBorder = "#91caff";
        break;
      case "completed":
        tagColorBg = "#f6ffed";
        tagColorText = "#52c41a";
        tagColorBorder = "#b7eb8f";
        break;
      case "cancelled":
        tagColorBg = "#fff2f0";
        tagColorText = "#ff4d4f";
        tagColorBorder = "#ffccc7";
        break;
      default:
        tagColorBg = "#faad14";
        tagColorText = "#fadb14";
        tagColorBorder = "#ffe58f";
        break;
    }

  return (
    <View>
      <Text
        style={{
          backgroundColor: tagColorBg,
          color: Colors.white,
          borderColor: tagColorBorder,
          padding: 5,
          borderRadius: 5,
        }}
      >
        {status}
      </Text>
    </View>
  );
}

export default OrderStatus