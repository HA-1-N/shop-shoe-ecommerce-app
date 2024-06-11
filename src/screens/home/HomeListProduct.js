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
import { useNavigation } from "@react-navigation/native";

const HomeListProduct = ({ productDetails, getProduct, initalValues, queryParams }) => {

  const navigation = useNavigation();

  const [refresh, setRefresh] = useState(false);

  const handleNavigateProductDetail = (id) => {
    navigation.navigate("NavigationProductDetail", { id: id });
  };

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    getProduct(initalValues, queryParams);
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
                key={index}
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
