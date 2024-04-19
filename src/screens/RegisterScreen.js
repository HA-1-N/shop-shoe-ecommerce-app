import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from '../utils/common/color.ultil';

const RegisterScreen = () => {

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

  return (
    <>
     <View>
        <Text>RegisterScreen</Text>
        <View>
        <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && <Text style={styles.textRequired}>Email is required.</Text>}

          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <Text style={styles.textRequired}>Password is required.</Text>}


          <Button title="Submit" onPress={handleSubmit(onSubmit)} style={styles.btnSubmit} />
        </View>
     </View>
    </>
  );          
}

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
    },
    textRequired: {
      color: Colors.danger,
    },
    btnSubmit: {
      marginTop: 10,
      padding: 10,
      borderRadius: 5,
    },
  });

export default RegisterScreen