import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeSearch = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrap}>
          <TextInput style={styles.input} placeholder="Search..." />
          <View style={styles.icon}>
            <Ionicons name="search" color="#000" size={20} />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
  },
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: "white",
    width: "90%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  icon: {
    width: "10%",
    alignItems: "center",
  }
});

export default HomeSearch;
