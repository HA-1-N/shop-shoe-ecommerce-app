import React from "react";
import Colors from "../../utils/common/color.ultil";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import { validateEmailFormat } from "../../utils/common/validate.util";
import { loginApi } from "../../api/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { incrementCountNumberLogin, setUserId } from "../../redux/features/auth.slice";

const LoginScreen = ({navigation}) => {

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginApi(data);
      const getRoleCode = res?.data?.roles?.map((role) => role.code);
      if (res && getRoleCode.includes("USER")) {
        await AsyncStorage.setItem("token", res?.data?.token);
        await AsyncStorage.setItem("id", res?.data?.id?.toString());
        await AsyncStorage.setItem("refreshToken", res?.data?.refreshToken);
        dispatch(incrementCountNumberLogin());  
        dispatch(setUserId(res?.data?.id));
        navigation.navigate("NavigationBar");
      } else {
        alert("Account not account user!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClickSignUp = () => {
    navigation.navigate("Register");
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View>
          <CustomInput
            control={control}
            name="email"
            label="Email"
            rules={{
              required: {
                value: true,
                message: "Email is required",
                validate: validateEmailFormat,
              },
            }}
            placeholder="Enter your email"
            required={true}
          />

          <CustomInput
            control={control}
            name="password"
            label="Password"
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
            }}
            placeholder="Enter your password"
            secureTextEntry={true}
            required={true}
          />

          <View style={styles.wrapBtnSubmit}>
            <Button
              title="Login"
              onPress={handleSubmit(onSubmit)}
              style={styles.btnSubmit}
            />
          </View>

          <View style={styles.signUpFooter} >
            <Text>Don't have an account?</Text>
            <Text style={styles.textSignUp} onPress={handleClickSignUp}>Register</Text>
          </View>
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
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.info,
    textAlign: "center",
    marginVertical: 15,
  },
  textRequired: {
    color: Colors.danger,
  },
  wrapBtnSubmit: {
    marginVertical: 10,
  },  
  btnSubmit: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  signUpFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  textSignUp: {
    color: Colors.info,
    marginLeft: 5,
  },
});

export default LoginScreen;
