import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Colors from "../../utils/common/color.ultil";
import CustomInput from "../../components/CustomInput";
import {
  validateEmailFormat,
  validatePasswordMatch,
} from "../../utils/common/validate.util";
import { Dropdown } from "react-native-element-dropdown";
import { optionGenders } from "../../utils/data.util";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { registerApi } from "../../api/auth.api";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = () => {

  const navigation = useNavigation();

  const [value, setValue] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [image, setImage] = useState(null);
  console.log("image", image);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);

    // return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const onChangeDateTimePicker = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      // setShowPicker(Platform.OS === "android");
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  const changeDateOfBirth = (event, selectedDate) => {
    // console.log("selectedDate", selectedDate);
  };

  const onSubmit = async (data) =>{

    const formData = new FormData();

    const newValues = {
      ...data,
      gender: value,
      dateOfBirth: dateOfBirth,
      roleIds: [2],
      prefix: "+84",
    };

    console.log("newValues", newValues);

    formData.append('data', new Blob([JSON.stringify(newValues)], { type: 'application/json' }));
    
    const filename = image.split('/').pop();
    console.log("filename", filename);
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    console.log("type", type);
    // registerApi(formData)
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       navigation.navigate("Login");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <ScrollView>
          <View>
            <CustomInput
              control={control}
              name={"name"}
              placeholder={"Enter your name"}
              rules={{
                required: "Name is required.",
              }}
              label={"Name"}
              required={true}
            />

            <CustomInput
              control={control}
              name={"email"}
              label={"Email"}
              required={true}
              placeholder={"Enter your email"}
              // keyboardType={"email-address"}
              rules={{
                required: "Email is required.",
                validate: validateEmailFormat,
              }}
            />

            <CustomInput
              label={"Password"}
              control={control}
              name={"password"}
              placeholder={"Enter your password"}
              secureTextEntry={true}
              rules={{
                required: "Password is required.",
              }}
              required={true}
            />

            <CustomInput
              control={control}
              name={"confirmPassword"}
              label={"Confirm password"}
              required={true}
              placeholder={"Enter your confirm password"}
              secureTextEntry={true}
              rules={{
                required: "Confirm password is required.",
                validate: validatePasswordMatch,
              }}
            />

            <CustomInput
              control={control}
              name={"phone"}
              placeholder={"Enter your phone"}
              rules={{
                required: "Phone is required.",
              }}
              keyboardType={"numeric"}
              label={"Phone"}
              required={true}
            />

            <CustomInput
              control={control}
              name={"age"}
              placeholder={"Enter your age"}
              rules={{
                required: "Age is required.",
              }}
              keyboardType={"numeric"}
              label={"Age"}
              required={true}
            />

            {/* <View>
              <Controller>

              </Controller>
            </View> */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={optionGenders}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select gender"
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />

            {showPicker && (
              <RNDateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChangeDateTimePicker}
              />
            )}

            {/* {showPicker && } */}

            {/* {!showPicker && ( */}
            <View>
              <Text style={styles.label}>
                {"Date Of birth"} {<Text style={styles.required}>*</Text>}
              </Text>
              <Pressable onPress={toggleDatePicker}>
                <TextInput
                  placeholder="Select date"
                  value={dateOfBirth}
                  onChangeText={changeDateOfBirth}
                  placeholderTextColor={Colors.gray}
                  editable={false}
                  onPressIn={toggleDatePicker}
                  style={styles.input}
                />
              </Pressable>
            </View>
            {/* )} */}

            <View style={styles.container}>
              <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
              />
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>

            <Button
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              style={styles.btnSubmit}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
    padding: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.orange,
    textAlign: "center",
    marginBottom: 10,
  },
  btnSubmit: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },

  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  image: {
    width: "100%", // Full width
    height: 300,
    resizeMode: "contain",
    marginTop: 20,
  },
  input: {
    height: 40,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.5,
    marginBottom: 20,
    padding: 10,
    color: Colors.black,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.grey,
  },
  required: {
    color: Colors.danger,
  },
});

export default RegisterScreen;
