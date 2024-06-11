import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import HomeSearch from "./HomeSearch";
import HomeListProduct from "./HomeListProduct";
import { filterProductApi } from "../../api/product.api";
import { TOTAL_COUNT_HEADER } from "../../utils/constants/page.constant";

const HomeScreen = () => {
  const initialValues = {
    name: null,
    status: null,
    categoryId: null,
    brandId: null,
    sizeId: null,
    colorId: null,
    minPrice: 0,
    maxPrice: 3000000,
  };

  const [productDetails, setProductDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  const queryParams = {
    page: page - 1,
    size: 16,
  };

  const getProduct = async (body, queryParams) => {
    try {
      const response = await filterProductApi(body, queryParams);
      setProductDetails(response.data);
      setTotalPage(parseInt(response.headers[TOTAL_COUNT_HEADER]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(initialValues, queryParams);
  }, [page]);

  return (
    <>
      <View>
        <HomeSearch getProduct={getProduct} page={page} />
        <HomeListProduct
          productDetails={productDetails}
          getProduct={getProduct}
          initialValues={initialValues}
          queryParams={queryParams}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
