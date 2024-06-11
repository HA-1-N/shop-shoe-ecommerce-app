import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../utils/common/color.ultil";

const CustomInput = ({
  label,
  control,
  name,
  required,
  rules = {},
  placeholder,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <View style={styles.wrapContainer}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View
              style={[
                styles.container,
                { borderColor: error ? "red" : "#e8e8e8" },
              ]}
            >
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
              />
            </View>
            {error && (
              <Text style={{ color: "red", alignSelf: "stretch" }}>
                {error.message || "Error"}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.grey,
  },
  required: {
    color: Colors.danger,
  },
  container: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});

export default CustomInput;
