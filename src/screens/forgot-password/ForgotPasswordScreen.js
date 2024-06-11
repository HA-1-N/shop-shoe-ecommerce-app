import React from "react";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import Colors from "../../utils/common/color.ultil";
import CustomInput from "../../components/CustomInput";
import { validateEmailFormat } from "../../utils/common/validate.util";
import { useForm } from "react-hook-form";
import { verifyEmailApi } from "../../api/auth.api";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    const params = {
      email: data?.email,
    };
    try {
      const res = await verifyEmailApi(params);
      if (res) {
        navigation.navigate("Verify OTP Email", { email: data?.email });
        alert("Verify Email successfully!");
      }
    } catch (error) {
      console.log("error", error);
      alert("Email is not exist.");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Verify Email</Text>
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

export default ForgotPasswordScreen;
