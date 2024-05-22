import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CardCustom from "../../components/CardCustom";
import { filterProductApi } from "../../api/product.api";

const HomeListProduct = ({ navigation }) => {
  const [productDetails, setProductDetails] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [countProduct, setCountProduct] = useState(0);

  const filterProduct = async () => {
    const body = {
      name: null,
      status: null,
      brandId: null,
      categoryId: null,
      colorId: null,
      sizeId: null,
      maxPrice: null,
      minPrice: null,
    };
    const params = {
      page: 0,
      size: 10,
    };
    try {
      const response = await filterProductApi(body, params);
      setProductDetails(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filterProduct();
  }, [countProduct]);

  const handleNavigateProductDetail = (id) => {
    navigation.navigate("NavigationProductDetail", { id: id });
  };

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setCountProduct(countProduct + 1);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 120 }}
      contentInsetAdjustmentBehavior="automatic"
      alwaysBounceVertical={true}
      snapToEnd={true}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.row}>
          {productDetails?.map((item, index) => (
            <View key={index} style={styles.col}>
              <CardCustom
                id={item?.id}
                handleNavigateProductDetail={handleNavigateProductDetail}
                imageUrl={item?.productImages[0]?.url}
                productName={item?.name}
                price={item?.price}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 10,
    // height: '100%',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flexWrap: "wrap",
  },
  col: {
    width: "48%",
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default HomeListProduct;
