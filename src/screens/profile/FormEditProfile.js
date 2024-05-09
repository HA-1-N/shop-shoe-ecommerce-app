import React from 'react'
import { useForm } from 'react-hook-form';
import { Button, StyleSheet, Text, View } from 'react-native'
import CustomInput from '../../components/CustomInput';
import { validateEmailFormat } from '../../utils/common/validate.util';

const FormEditProfile = ({navigation}) => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      age: "",
      phoneNumber: "",
      gender: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <View>
      {/* <Text>Form Edit Profile</Text> */}
      <View>
        <CustomInput
          control={control}
          name={"name"}
          label={"Name"}
          placeholder={"Enter your name"}
          rules={{
            required: "Name is required.",
          }}
          required={true}
        />

        <CustomInput
          control={control}
          name={"email"}
          label={"Email"}
          placeholder={"Enter your email"}
          rules={{
            required: "Email is required.",
            validate: validateEmailFormat,
          }}
          required={true}
        />

        <CustomInput
          control={control}
          name={"phone"}
          label={"Phone"}
          placeholder={"Enter your phone"}
          rules={{
            required: "Phone is required.",
          }}
          keyboardType={"numeric"}
          required={true}
        />

        <CustomInput
          control={control}
          name={"age"}
          label={"Age"}
          placeholder={"Enter your age"}
          rules={{
            required: "Age is required.",
          }}
          keyboardType={"numeric"}
          required={true}
        />

        <Button
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          style={styles.btnSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FormEditProfile