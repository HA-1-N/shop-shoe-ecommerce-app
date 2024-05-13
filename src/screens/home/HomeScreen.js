import React from "react";
import {  StyleSheet, View } from "react-native";
import HomeSearch from "./HomeSearch";
import HomeListProduct from "./HomeListProduct";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <View>
        <HomeSearch />
        <HomeListProduct navigation={navigation} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
