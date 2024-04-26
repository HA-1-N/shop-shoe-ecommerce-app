import React from "react";
import Colors from "../../utils/common/color.ultil";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import { validateEmailFormat } from "../../utils/common/validate.util";

const LoginScreen = ({navigation}) => {
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

  const onSubmit = (data) => console.log(data);

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
