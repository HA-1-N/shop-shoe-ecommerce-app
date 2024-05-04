import React from 'react'
import { Button, Text, View } from 'react-native'

const SettingScreen = ({navigation}) => {
  return (
    <View>
      <Text>SettingScreen</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('NavigationAuth')} />
    </View>
  );
}

export default SettingScreen