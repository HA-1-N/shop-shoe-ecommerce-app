import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { filterShippingMethod } from "../../api/shipping-method.api";
import { filterPaymentTypeApi } from "../../api/payment.api";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearCartApi, getCartItemApi } from "../../api/cart.api";
import { orderCheckoutApi } from "../../api/order.api";
import { incrementCart } from "../../redux/features/cart.slice";
import { useDispatch } from "react-redux";

const CheckoutScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const currentDate = new Date();

  const [userId, setUserId] = React.useState(null);
  const [shippingMethodValue, setShippingMethodValue] = React.useState(null);
  const [name, onChangeName] = React.useState("");
  const [address, onChangeAddress] = React.useState("");
  const [city, onChangeCity] = React.useState("");
  const [country, onChangeCountry] = React.useState("");
  const [phone, onChangePhone] = React.useState("");
  const [payment, onChangePayment] = React.useState(null);
  const [optionShippingMethods, setOptionShippingMethods] = useState([]);
  const [optionPaymentMethods, setOptionPaymentMethods] = useState([]);
  const [notes, setNotes] = useState("");
  const [listCartItem, setListCartItem] = useState([]);

   // get user id from local storage
  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      setUserId(userId);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUserId();
    getCartItem();
  }, [userId]);

  const getShippingMethod = async () => {
    // Call API to get shipping method

    const data = {
      method: "",
      price: 0,
    };

    const params = {
      page: 0,
      size: 10000,
    };

    try {
      const res = await filterShippingMethod(data, params);
      const optionShippingMethod = res?.data?.map((item) => ({
        label: item.method,
        value: item.method,
      }));
      setOptionShippingMethods(optionShippingMethod);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPaymentType = async () => {
    const data = {
      type: "",
    };

    const params = {
      page: 0,
      size: 10000,
    };

    try {
      const res = await filterPaymentTypeApi(data, params);
      if (res) {
        const optionPaymentType = res?.data?.map((item) => ({
          label: item.type,
          value: item.type,
        }));
        setOptionPaymentMethods(optionPaymentType);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCartItem = async () => {
    if (userId === null) {
      return;
    }
    getCartItemApi(Number(userId))
      .then((res) => {
        setListCartItem(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
    };

  useEffect(() => {
    getShippingMethod();
    getPaymentType();
  }, []);

  const getListProductUpload = listCartItem?.map((item) => ({
    id: item?.product?.id,
    quantity: item?.quantity,
    sizeId: item?.size?.id,
    colorId: item?.color?.id,
    totalPrice: item?.quantity * item?.product?.price,
  }));

  const total = listCartItem?.reduce((acc, item) => {
    return acc + Number(item?.product?.price) * Number(item?.quantity);
  }, 0);

  const handleSubmit = async () => {
    // Call API to submit order
    const values = {
      userId: Number(userId),
      name: name,
      address: address,
      city: city,
      country: country,
      phone: phone,
      shippingMethod: shippingMethodValue,
      paymentMethod: payment,
      note: notes,
      prefix: "+84",
      status: 'Pending',
      orderDate: dayjs(currentDate).format("YYYY-MM-DD HH:mm:ss"),
      productCheckouts: getListProductUpload,
      orderTotal: total,
    }

    try {
      const res = await orderCheckoutApi(values);
      
      if (res) {
        navigation.navigate("OrderNavigation");
        alert("Checkout successfully");
        clearCartApi(Number(userId))
          .then((res) => {
            // console.log("res", res);
            dispatch(incrementCart());
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    } catch (error) {
      
    }

  };

 

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Delivery Address */}
        <Text style={styles.sectionHeading}>Shipping Address</Text>

        <View style={{ marginTop: 10 }}>
          <View>
            <Text>Name</Text>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Enter your name"
              />
            </View>
          </View>

          <View>
            <Text>Address</Text>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeAddress}
                value={address}
                placeholder="Enter your address"
              />
            </View>
          </View>

          <View>
            <Text>City</Text>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeCity}
                value={city}
                placeholder="Enter your city"
              />
            </View>
          </View>

          <View>
            <Text>Country</Text>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeCountry}
                value={country}
                placeholder="Enter your country"
              />
            </View>
          </View>

          <View>
            <Text>Phone</Text>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangePhone}
                value={phone}
                placeholder="Enter your phone"
              />
            </View>
          </View>
        </View>

        {/* Shipping method radio box*/}
        <Text style={styles.sectionHeading}>Shipping Method</Text>
        <View>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={optionShippingMethods}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select shipping Method"
            searchPlaceholder="Search..."
            value={shippingMethodValue}
            onChange={(item) => {
              setShippingMethodValue(item.value);
            }}
          />
        </View>

        {/* Payment */}
        <Text style={styles.sectionHeading}>Payment Method</Text>
        <View>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={optionPaymentMethods}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select payment type"
            searchPlaceholder="Search..."
            value={payment}
            onChange={(item) => {
              onChangePayment(item.value);
            }}
          />
        </View>

        {/* Additional Notes */}
        <Text style={styles.sectionHeading}>Additional Notes:</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Write Here"
          multiline
          // numberOfLines={4}
          onChangeText={(text) => setNotes(text)}
          value={notes}
        />

        {/* Order Summary */}
        <Text style={styles.orderSummary}>Order Summary</Text>
        {/* Display your order items here */}
        {/* Example: */}
        {listCartItem?.map((item) => (
          <Text key={item.id}>
            {item?.product?.name} x {item?.quantity} x{" "}
            {item?.product?.price?.toLocaleString("en-US") + " VND"}
          </Text>
        ))}
        {/* <Text>Discount: -$100.00</Text> */}
        {/* <Text>Shipping: FREE Delivery</Text> */}
        <Text style={styles.total}>
          Total: {total?.toLocaleString("en-US")} VND
        </Text>

        {/* Submit Order Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    height: 100,
  },
  orderSummary: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: "green",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CheckoutScreen;
