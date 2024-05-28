import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { getAllCategoryApi } from "../../api/category.api";
import { getAllBrandApi } from "../../api/brand.api";
import { getAllSizeApi } from "../../api/size.api";
import { getAllColorApi } from "../../api/color.api";

const HomeSearch = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 2500000]);
  
  const [listSize, setListSize] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listCategory, setListCategory] = useState([]);
 
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['#00bfff', '#ff4500', '#800080', '#ff1493'];
  const brands = ['HasThemes', 'HasTech', 'Bootxperts', 'Codecarnival'];

  const getAllCategory = async () => {
    try {
      const res = await getAllCategoryApi();
      setListCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBrand = async () => {
    try {
      const res = await getAllBrandApi();
      setListBrand(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSize = async () => {
    try {
      const res = await getAllSizeApi();
      setListSize(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllColor = async () => {
    try {
      const res = await getAllColorApi();
      setListColor(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllBrand();
    getAllSize();
    getAllColor();
  }, []);

  const handleOpenFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const handleSearch = (text) => {
    setSearch(text);
    // dispatch({ type: "SEARCH", payload: text });
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleCancel = () => {
    setIsOpenFilter(false);
    setSelectedSize(null);
    setSelectedColor(null);
    setPriceRange([0, 2500000]);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrap}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={search}
            onChangeText={handleSearch}
          />
          <View style={styles.icon}>
            <TouchableOpacity onPress={handleOpenFilter}>
              <Ionicons name="search" color="#000" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {isOpenFilter && (
          <View style={styles.wrapFilter}>
            {/* Price Range Slider */}
            <Text style={styles.label}>Price</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.priceLabel}>{priceRange[0]}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={2500000}
                step={10000}
                value={priceRange[0]}
                onValueChange={(value) => setPriceRange([value, priceRange[1]])}
                minimumTrackTintColor="#ff1493"
                maximumTrackTintColor="#d3d3d3"
              />
              <Slider
                style={styles.slider}
                minimumValue={2500000}
                maximumValue={5000000}
                step={10000}
                value={priceRange[1]}
                onValueChange={(value) => setPriceRange([priceRange[0], value])}
                minimumTrackTintColor="#ff1493"
                maximumTrackTintColor="#d3d3d3"
              />
              <Text style={styles.priceLabel}>{priceRange[1]}</Text>
            </View>
            {/* Size */}
            <Text style={styles.label}>Size</Text>
            <View style={styles.sizeContainer}>
              {sizes.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSizeChange(size)}
                  style={[
                    styles.sizeBox,
                    selectedSize === size && styles.selectedSizeBox,
                  ]}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Color */}
            <Text style={styles.label}>Color</Text>
            <View style={styles.colorContainer}>
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleColorChange(color)}
                  style={[
                    styles.colorBox,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColorBox,
                  ]}
                />
              ))}
            </View>

            {/* Brands */}
            <Text style={styles.label}>Brand</Text>
            <View style={styles.brandContainer}>
              {brands.map((brand, index) => (
                <Text key={index} style={styles.brandText}>
                  {brand}
                </Text>
              ))}
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Button title="APPLY" onPress={() => {}} color="#007bff" />
              <Button title="CANCEL" onPress={() => {}} color="#6c757d" />
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
  },
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  wrapFilter: {
    padding: 20
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
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
  },
  priceLabel: {
    width: 40,
    textAlign: 'center',
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  sizeBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedSizeBox: {
    backgroundColor: '#007bff',
  },
  sizeText: {
    color: '#000',
  },
  selectedSizeText: {
    color: '#fff',
  },
  colorContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  selectedColorBox: {
    borderWidth: 2,
    borderColor: '#000',
  },
  brandContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  brandText: {
    marginRight: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default HomeSearch;
