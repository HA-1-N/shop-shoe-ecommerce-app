import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Platform,
  Pressable,
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

const RegisterScreen = () => {
  const [value, setValue] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

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

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);

    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
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

  const changeDateOfBirth = (event, selectedDate) => {};



  const onSubmit = (data) => console.log(data);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View>
          <CustomInput
            control={control}
            name={"name"}
            placeholder={"Enter your name"}
            rules={{
              required: "Name is required.",
            }}
          />

          <CustomInput
            control={control}
            name={"email"}
            placeholder={"Enter your email"}
            rules={{
              required: "Email is required.",
              validate: validateEmailFormat,
            }}
          />

          <CustomInput
            control={control}
            name={"password"}
            placeholder={"Enter your password"}
            secureTextEntry={true}
            rules={{
              required: "Password is required.",
            }}
          />

          <CustomInput
            control={control}
            name={"confirmPassword"}
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
          />

          <CustomInput
            control={control}
            name={"age"}
            placeholder={"Enter your age"}
            rules={{
              required: "Age is required.",
            }}
            keyboardType={"numeric"}
          />

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
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color="black"
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />

          {showPicker && (
            <RNDateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChangeDateTimePicker}
            />
          )}

          {!showPicker && (
            <Pressable onPress={toggleDatePicker}>
              <TextInput
                placeholder="Select date"
                value={dateOfBirth}
                onChangeText={changeDateOfBirth}
                placeholderTextColor={Colors.gray}
                editable={false}
                onPressIn={toggleDatePicker}
              />
            </Pressable>
          )}

          <Button
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            style={styles.btnSubmit}
          />
        </View>
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
});

export default RegisterScreen;