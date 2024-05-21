import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getOrderByIdApi } from "../../api/order.api";
import CardOrderDetail from "../../components/CardOrderDetail";
import Colors from "../../utils/common/color.ultil";
import OrderStatus from "../../components/OrderStatus";

const OrderDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params;

  const [orderDetail, setOrderDetail] = useState(null);

  const getOrderById = async () => {
    // Add your get order detail logic here
    try {
        const res = await getOrderByIdApi(Number(id));
        setOrderDetail(res.data);
      } catch (error) {
        console.log('error', error);
      }
  }

  useEffect(() => {
    getOrderById();
  }, []);


  return (
    <View>
      <ScrollView>
        <View>
          {orderDetail &&
            orderDetail?.orderProducts?.map((item, index) => (
              <CardOrderDetail
                key={index}
                image={item?.product?.productImages[0]?.url}
                productName={item?.product?.name}
                price={item?.product?.price}
                quantity={item?.quantity}
                colorText={item?.color?.name}
                size={item?.size?.name}
              />
            ))}
        </View>

        <View style={styles.container}>
          <Text style={styles.titleHeader}>Shipping Address</Text>
          <View>
            <View style={[styles.wrap, styles.mh_5]}>
              <Text style={styles.text}>Name: </Text>
              <Text style={styles.textContent}>
                {orderDetail?.userAddress?.name}
              </Text>
            </View>

            <View style={[styles.wrap, styles.mh_5]}>
              <Text style={styles.text}>Phone number: </Text>
              <Text style={styles.textContent}>
                {orderDetail?.userAddress?.phone}
              </Text>
            </View>

            <View style={[styles.wrap, styles.mh_5]}>
              <Text style={styles.text}>Address: </Text>
              <Text style={styles.textContent}>
                {orderDetail?.userAddress?.address}
              </Text>
            </View>

            <View style={[styles.wrap, styles.mh_5]}>
              <Text style={styles.text}>City: </Text>
              <Text style={styles.textContent}>
                {orderDetail?.userAddress?.city}
              </Text>
            </View>

            <View style={[styles.wrap, styles.mh_5]}>
              <Text style={styles.text}>Country: </Text>
              <Text style={styles.textContent}>
                {orderDetail?.userAddress?.country}
              </Text>
            </View>

            <View style={[styles.wrap, styles.mh_5]}>
              <Text style={styles.text}>Shipping method: </Text>
              <Text style={styles.textContent}>
                {orderDetail?.shippingMethod?.method}
              </Text>
            </View>

            <View style={[styles.wrap, styles.mh_5]}>
              <Text style={styles.text}>Order status: </Text>

              <OrderStatus status={orderDetail?.orderStatus?.status} />
            </View>

            <View style={[styles.wrap, styles.mh_5]}>
              <Text style={styles.text}>Order Total: </Text>
              <Text style={styles.textContent}>
                {orderDetail?.orderTotal?.toLocaleString("en-US")} VND
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 10,
    marginHorizontal: 10,
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: "bold",
    // margin: 10,
  },
  wrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textContent: {
    fontSize: 16,
  },
  mh_5: {
    marginVertical: 5,
  }
});

export default OrderDetailScreen;
