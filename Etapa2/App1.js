import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Inputs from './components/Inputs';
import ScrollViewExample from './components/ScrollViewExample';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollViewExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent:'space-between',
    alignItems:'center',
    height: 600,
    marginTop: 150,
  },
});