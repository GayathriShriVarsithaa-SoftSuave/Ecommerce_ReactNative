import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import {
  SafeAreaProvider,SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import HomeScreen from "../Ecommerce/src/screens/HomeScreen"

function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <HomeScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default App;
