import React from 'react'
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';

const CustomSelect = ({
  label,
  control,
  name,
  required,
  rules = {},
  open,
  placeholder,
  items,
  setOpen,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <View>
      <Text>
        {label} {required && <Text>*</Text>}
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
            <View>
              <DropDownPicker
                style={[styles.dropdown, error.gender && styles.error]}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                // setValue={(val) => {
                //   onChange(val);
                //   setValue(val);
                // }}
                setItems={setItems}
                placeholder={placeholder}
              />
            </View>
            {error && <Text>{error.message || "Error"}</Text>}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    dropdown: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    error: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
    submitButton: {
      backgroundColor: '#000',
      color: '#FFF',
      padding: 10,
      textAlign: 'center',
      borderRadius: 5,
    },
  });

export default CustomSelect