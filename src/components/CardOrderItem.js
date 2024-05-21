import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../utils/common/color.ultil';
import OrderStatus from './OrderStatus';
import { formatDate } from '../utils/date.util';

const CardOrderItem = ({
  orderID,
  orderDate,
  orderStatus,
  shippingMethod,
  orderTotal,
  handleNavigationOrderDetail,
}) => {

  const formatDateTime = formatDate(orderDate * 1000, 'DD-MM-YYYY HH:mm:ss');

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View>
          <Text style={styles.text}>Order ID: {orderID}</Text>
          <Text style={styles.text}>Order date: {formatDateTime}</Text>
          <View style={styles.boxStatus}>
            <Text style={styles.text}>Status: </Text>
            <OrderStatus status={orderStatus} />
          </View>
          <Text style={styles.text}>Shipping Method: {shippingMethod}</Text>
          <Text style={styles.text}>
            Total order: {orderTotal?.toLocaleString("en-US")} VND
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleNavigationOrderDetail(orderID)}>
          <Text style={[styles.text, styles.my10, styles.btnView]}>
            View Detail
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  boxStatus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  btnView: {
    backgroundColor: Colors.black,
    padding: 6,
    borderRadius: 5,
    color: Colors.white,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  my10: {
    marginVertical: 10,
  },
});

export default CardOrderItem