import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { ThemeProvider } from './src/contexts/ThemeContext'; // NOVA
// import HomeScreen from './src/screens/HomeScreen';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { ShopProvider } from './src/contexts/ShopContext';


export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ShopProvider>
          <RootNavigator />
        </ShopProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});