import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const CheckoutScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Delivery Address */}
        <Text style={styles.sectionHeading}>Delivery Address</Text>
        <TextInput
          style={styles.input}
          placeholder="123 Main Street, Anytown, USA 12345"
        />

        {/* Payment */}
        <Text style={styles.sectionHeading}>Payment</Text>
        <TextInput style={styles.input} placeholder="XXXX XXXX XXXX 3456" />

        {/* Additional Notes */}
        <Text style={styles.sectionHeading}>Additional Notes:</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Write Here"
          multiline
        />

        {/* Order Summary */}
        <Text style={styles.orderSummary}>Order Summary</Text>
        {/* Display your order items here */}
        {/* Example: */}
        <Text>Nike SB Zoom Stefan 2 x $2000.00</Text>
        <Text>Nike SB Zoom Stefan Janoski 2 x $1699.00</Text>
        <Text>Discount: -$100.00</Text>
        <Text>Shipping: FREE Delivery</Text>
        <Text style={styles.total}>Total: $3,599.00</Text>

        {/* Submit Order Button */}
        <TouchableOpacity style={styles.submitButton}>
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    height: 100,
  },
  orderSummary: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export default CheckoutScreen;