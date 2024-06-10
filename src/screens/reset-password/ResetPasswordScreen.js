import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Colors from "../../utils/common/color.ultil";
import CustomInput from "../../components/CustomInput";
import { validatePasswordMatch } from "../../utils/common/validate.util";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import { resetPasswordApi } from "../../api/auth.api";

const ResetPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const route = useRoute();
  const navigation = useNavigation();
  const email = route?.params?.email;

  const onSubmit = async (data) => {
    const body = {
      email: email,
      password: data?.password,
    };

    try {
      const res = await resetPasswordApi(body);
      if (res) {
        navigation.navigate("Login");
        alert("Reset password successfully! Please login again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("Reset password failed.");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>

        <View>
          <CustomInput
            label={"New password"}
            control={control}
            name={"password"}
            placeholder={"Enter your password"}
            secureTextEntry={true}
            rules={{
              required: "New password is required.",
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
        </View>

        <View style={styles.wrapBtnSubmit}>
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
});

export default ResetPasswordScreen;
