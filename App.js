import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';


export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      {/* <LoginScreen /> */}
      {/* <HomeScreen /> */}
      <RegisterScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});;
