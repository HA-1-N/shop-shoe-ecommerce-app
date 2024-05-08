import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import HomeSearch from "./HomeSearch";
import HomeListProduct from "./HomeListProduct";

const HomeScreen = ({navigation}) => {

  const handleNavigateProductDetail = () => {
    navigation.navigate("NavigationProductDetail");
  }

  return (
    <>
      <View>
        <HomeSearch />
        <HomeListProduct handleNavigateProductDetail={handleNavigateProductDetail}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
