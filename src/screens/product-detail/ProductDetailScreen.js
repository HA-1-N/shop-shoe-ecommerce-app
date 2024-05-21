import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import Colors from "../../utils/common/color.ultil";
import { getProductByIdApi } from "../../api/product.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addToCartApi } from "../../api/cart.api";
import { useDispatch } from "react-redux";
import { incrementCart } from "../../redux/features/cart.slice";

const ProductDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const dispatch = useDispatch();

  const [productDetail, setProductDetail] = useState({});
  const [listColor, setListColor] = useState([]);
  const [listSizeColor, setListSizeColor] = useState([]);
  const [listProductImage, setListProductImage] = useState([]);
  const [productQuantitiesDetail, setProductQuantitiesDetail] = useState([]);
  const [idStorage, setIdStorage] = useState(null);

  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [quantity, setQuantity] = useState(1);

  const getIdLocalStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        console.log("value", value);
        setIdStorage(Number(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIdLocalStorage();
  }, []);

  const getProductById = async () => {
    try {
      const response = await getProductByIdApi(id);
      const productQuantities = response.data?.productQuantities;

      const sizeColorArr = productQuantities?.map((item) => ({
        size: item?.size,
        color: item?.color,
      }));

      const transformedDataSizeColor = sizeColorArr.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.color.id === item.color.id);

        if (existingItem) {
          existingItem.size.push(item.size);
        } else {
          acc.push({
            color: item.color,
            size: [item.size],
          });
        }

        return acc;
      }, []);

      setListSizeColor(transformedDataSizeColor);

      const getListColor = transformedDataSizeColor?.map((item) => item.color);
      const getSizeByColor = transformedDataSizeColor
        ?.filter((item) => item.color.id === getListColor[0]?.id)
        ?.map((item) => item.size)
        ?.flat();

      const getListImage = getImagesBySizeAndColor(
        productQuantities,
        getSizeByColor[0],
        getListColor[0]
      );

      const getImageUrl = getListImage.map((item) => item?.url);

      setProductDetail(response?.data);
      setProductQuantitiesDetail(productQuantities);
      setListProductImage(getImageUrl);
      setListColor(getListColor);
      setProductQuantitiesDetail(productQuantities);
      setSelectedColor(getListColor[0]);
      setSelectedSize(getSizeByColor[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  const getImagesBySizeAndColor = (productQuantities, size, color) => {
    const images = [];
    productQuantities?.forEach((item) => {
      if (
        item?.size?.name === size?.name &&
        item?.color?.name === color?.name
      ) {
        images.push(item?.productQuantityImages);
      }
    });

    return images.flat();
  };

  const handleColorChange = (color) => {
    const getListImage = getImagesBySizeAndColor(
      productQuantitiesDetail,
      selectedSize,
      color
    );
    setListProductImage(getListImage.map((item) => item?.url));
    setSelectedColor(color);
    const sizeColorArr = productQuantitiesDetail?.map((item) => ({
      size: item?.size,
      color: item?.color,
    }));
    const transformedDataSizeColor = sizeColorArr.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.color.id === item.color.id);

      if (existingItem) {
        existingItem.size.push(item.size);
      } else {
        acc.push({
          color: item.color,
          size: [item.size],
        });
      }

      return acc;
    }, []);

    const getSizeByColor = transformedDataSizeColor
      ?.filter((item) => item.color.id === color.id)
      ?.map((item) => item.size)
      ?.flat();

    setSelectedSize(getSizeByColor[0]);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (idStorage !== null) {
      // Add to cart
      const product = {
        userId: Number(idStorage),
        productId: Number(productDetail?.id),
        quantity: quantity,
        colorId: selectedColor?.id,
        sizeId: selectedSize?.id,
      };
      addToCartApi(product).then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          dispatch(incrementCart());
          alert("Add to cart successfully");
          navigation.navigate("Cart");
        }
      });
    } else {
      // Redirect to login
      navigation.navigate("NavigationAuth");
    }
  };

  const incrementQuantity = useCallback(() => {
    setQuantity(prevQuantity => prevQuantity + 1);
  }, []);

  const decrementQuantity = useCallback(() => {
    setQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
    );
  }, []);

  const width = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flex: 1 }}>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            autoPlayInterval={3000}
            data={listProductImage}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => {}}
            pagingEnabled={true}
            renderPagination={({ index, total }) => (
              <View style={styles.pagination}>
                {Array.from({ length: total }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.paginationDot,
                      i === index ? styles.activeDot : null,
                    ]}
                  />
                ))}
              </View>
            )}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  // justifyContent: "center",
                }}
              >
                <Image style={styles.image} source={{ uri: item }} />
              </View>
            )}
          />
        </View>
      </View>

      <View style={styles.wrap}>
        <View>
          <Text style={styles.title}>{productDetail?.name}</Text>
        </View>

        <View>
          <Text style={styles.description}>{productDetail?.description}</Text>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.colorTitle}>Color: </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {listColor.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleColorChange(color)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: color?.code,
                    marginRight: 10,
                    borderWidth: selectedColor?.code === color.code ? 6 : 2,
                    borderColor:
                      color.code === Colors.black
                        ? Colors.border
                        : "rgba(0, 0, 0, 0.2)",
                  }}
                />
              ))}
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.colorTitle}>Size: </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {listSizeColor
                ?.filter((item) => item?.color?.name === selectedColor?.name)
                ?.map((item) =>
                  item?.size?.map((size, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSizeChange(size)}
                      style={[
                        styles.sizeBox,
                        {
                          backgroundColor:
                            selectedSize === size ? "#000" : "#fff",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.sizeText,
                          {
                            color: selectedSize === size ? "#fff" : "#000",
                          },
                        ]}
                      >
                        {size?.name}
                      </Text>
                    </TouchableOpacity>
                  ))
                )}
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.colorTitle}>Quantity: </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#000",
                  width: 30,
                  height: 30,
                  padding: 5,
                  borderRadius: 5,
                  marginRight: 10,
                }}
                onPress={decrementQuantity}
              >
                <Text
                  style={{ color: "#FFF", textAlign: "center", fontSize: 16 }}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "#000",
                  padding: 5,
                  borderRadius: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{ color: "#FFF", textAlign: "center", fontSize: 16 }}
                  onPress={incrementQuantity}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ marginTop: 10, display: "flex", flexDirection: "row" }}
          >
            <Text style={styles.colorTitle}>Price: </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {productDetail?.price?.toLocaleString("en-US")} VND
            </Text>
          </View>
        </View>
      </View>

      {/* Add to cart */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "#FFF",
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={handleAddToCart}
        >
          <Text style={{ color: "#FFF", fontWeight: "bold" }}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  image: {
    flex: 1,
    objectFit: "contain",
    justifyContent: "center",
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
  activeDot: {
    backgroundColor: "#007AFF",
  },
  wrap: {
    // flex: 1,
    marginTop: Dimensions.get("window").width / 2 + 20,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  description: {
    fontSize: 16,
    color: "gray",
    // letterSpacing: 1,
  },
  colorTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sizeBox: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sizeText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProductDetailScreen;
