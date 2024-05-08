import React, { useEffect } from "react";
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import CardCustom from "../../components/CardCustom";
import { filterProductApi } from "../../api/product.api";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const HomeListProduct = ({handleNavigateProductDetail}) => {

  // const filterProduct = async () => {
  //   const body = {
  //     name: null,
  //     status: null,
  //     brandId: null,
  //     categoryId: null,
  //     colorId: [],
  //     sizeId: [],
  //     maxPrice: null,
  //     minPrice: null,
  //   }
  //   const params = {
  //     page: 1,
  //     size: 10,
  //   }
  //   try {
  //     const response = await filterProductApi(body, params);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   filterProduct();
  // }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            <CardCustom
              handleNavigateProductDetail={handleNavigateProductDetail}
            />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
          <View style={styles.col}>
            <CardCustom />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    flexWrap: 'wrap',
  },  
  col: {
    width: '48%',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default HomeListProduct;
