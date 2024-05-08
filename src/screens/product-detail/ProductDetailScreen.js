import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import Colors from '../../utils/common/color.ultil';

const imagesData = [
  "https://product.hstatic.net/200000410665/product/dsc00591_2a3d11abbdeb4df88c43b4eed8d61591.jpg",
  "https://product.hstatic.net/200000410665/product/2024-01-19_15-18-09__b_r8_s4__7aa0d4199c7145a19396a708eb05bb92.jpg",
  "https://product.hstatic.net/200000410665/product/2024-01-19_15-21-14__b_r8_s4__450171e53a9b43c688a7c1c03d854584.jpg"
];

const sizeData = [
  "S",
  "M",
  "L",
  "XL",
  "XXL"
];

const colorData = [
  {
    color: "Red",
    code: "#FF0000",
  },
  {
    color: "Green",
    code: "#00FF00",
  },
  {
    color: "Blue",
    code: "#0000FF",
  },
  {
    color: "Yellow",
    code: "#FFFF00",
  },
];

const ProductDetailScreen = () => {
  const [selectedColor, setSelectedColor] = useState(colorData[0].code);
  const [selectedSize, setSelectedSize] = useState(sizeData[0]);
  const [quantity, setQuantity] = useState(1);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const width = Dimensions.get('window').width;

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
            data={imagesData}
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
          <Text style={styles.title}>Product Detail</Text>
        </View>

        <View>
          <Text style={styles.description}>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.colorTitle}>Color: </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {colorData.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleColorChange(color.code)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: color.code,
                    marginRight: 10,
                    borderWidth: selectedColor === color.code ? 6 : 0,
                    borderColor:
                      color.code === Colors.black
                        ? Colors.white
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
              {sizeData.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSizeChange(size)}
                  style={[
                    styles.sizeBox,
                    {
                      backgroundColor: selectedSize === size ? "#000" : "#fff",
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
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
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
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                <Text style={{ color: "#FFF", textAlign: "center" , fontSize: 16 }}>-</Text>
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
                <Text style={{ color: "#FFF", textAlign: "center" , fontSize: 16 }} onPress={() => {
                  setQuantity(quantity + 1);
                }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ marginTop: 10, display: "flex", flexDirection: "row" }}
          >
            <Text style={styles.colorTitle}>Price: </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>100$</Text>
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