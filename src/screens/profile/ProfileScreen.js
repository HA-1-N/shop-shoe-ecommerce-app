import React from 'react'
import { StyleSheet, View } from "react-native";
import FormEditProfile from './FormEditProfile';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <FormEditProfile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ProfileScreen