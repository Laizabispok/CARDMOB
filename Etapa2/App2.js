import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList } from 'react-native';

import List from './components/List';

export default function App() {
 
  return (
    <View style={styles.container}>
      <List />
      <View style={styles.redbox}></View>
      <View style={styles.bluebox}></View>
      <View style={styles.blackbox}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: '600',
    marginTop: 150,
  },
  redbox: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 50,
  },
  bluebox: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  blackbox: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
  },

  // text: {
  //   fontSize: 24,
  //   fontFamily: 'cursive',
  // },
  // buttonContainer: {
  //   flexDirection: 'row',
  // },
  // input: {
  //   height: 40,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   marginBottom: 10,
  //   paddingHorizontal: 10,
  // },
  // list: {
  //   marginTop: 20,
  // },
  // item: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   marginBottom: 10,
  //   padding: 10,
  //   backgroundColor: '#f0f0f0',
  //   borderRadius: 5,
  // },
  // itemText: {
  //   flex: 1,
  //   marginRight: 10,
  // },
  // buttons: {
  //   flexDirection: 'row',
  // },
  // editInput: {
  //   flex: 1,
  //   marginRight: 10,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   paddingHorizontal: 10,
  });