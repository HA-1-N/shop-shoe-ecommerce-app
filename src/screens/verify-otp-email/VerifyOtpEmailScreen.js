import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Colors from "../../utils/common/color.ultil";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import { verifyOtpApi } from "../../api/auth.api";

const VerifyOtpEmailScreen = () => {
  const route = useRoute();
  const email = route?.params?.email;
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("data", data);
    const body = {
      email: email,
      otp: Number(data?.otp),
    };
    try {
      const res = await verifyOtpApi(body);
      if (res) {
        navigation.navigate("Reset Password", { email: email });
        alert("Verify Otp Email successfully!");
      }
    } catch (error) {
      console.log("error", error);
      alert("Otp is incorrect.");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Verify Otp Email</Text>
        <View>
          <CustomInput
            control={control}
            name={"otp"}
            placeholder={"Enter your otp"}
            rules={{
              required: "Otp is required.",
            }}
            keyboardType={"numeric"}
            label={"Otp"}
            required={true}
          />
        </View>

        <View style={styles.wrapBtnSubmit}>
          <Button
            title="Verify Otp Email"
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

export default VerifyOtpEmailScreen;
