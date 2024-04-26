import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeSearch from "./HomeSearch";
import HomeListProduct from "./HomeListProduct";

const HomeScreen = () => {
  return (
    <>
      <View>
        <HomeSearch />
        <HomeListProduct />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
