import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const SettingScreen = ({navigation}) => {

  const onPressEditProfile = () => {
    navigation.navigate("EditProfile");
  }

  const onPressChangePassword = () => {
    navigation.navigate("ChangePassword");
  }

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        {/* <Image
      source={require('./path/to/avatar.png')}
      style={styles.avatar}
    /> */}
        <View>
          <Text style={styles.greeting}>Hello, Amelia</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Your Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Wishlist</Text>
            </TouchableOpacity>
            {/* Add more buttons as needed */}
          </View>
        </View>
      </View>

      {/* Account Settings */}
      <TouchableOpacity style={styles.menuItem} onPress={onPressEditProfile}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onPressChangePassword}>
        <Text>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text>Saved Cards & Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text>Logout</Text>
      </TouchableOpacity>
      {/* Add more menu items as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  button: {
    marginRight: 10,
    padding: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 12,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default SettingScreen