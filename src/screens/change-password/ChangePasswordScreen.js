import React from "react";
import { useForm } from "react-hook-form";
import { Button, StyleSheet, Text, View } from "react-native";
import CustomInput from "../../components/CustomInput";
import { validateNewPasswordMatch, validatePasswordMatch } from "../../utils/common/validate.util";

const ChangePasswordScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <View style={styles.container}>
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

      <CustomInput
        control={control}
        name="newPassword"
        label="New password"
        rules={{
          required: {
            value: true,
            message: "New password is required",
          },
        }}
        placeholder="Enter your new password"
        secureTextEntry={true}
        required={true}
      />

      <CustomInput
        control={control}
        name="confirmPassword"
        label="Confirm password"
        rules={{
          required: {
            value: true,
            message: "Confirm password is required",
          },
          validate: validateNewPasswordMatch,
        }}
        placeholder="Enter your confirm password"
        secureTextEntry={true}
        required={true}
      />

      <View>
        <Button title="Change Password" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ChangePasswordScreen;
