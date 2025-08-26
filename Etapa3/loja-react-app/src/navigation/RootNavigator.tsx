import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAuth } from "../contexts/AuthContext";


export default function RootNavigator() {
  const {user, loading} = useAuth();

  if (loading) {
    return (
      <View style={ {flex: 1, justifyContent: 'center', alignItems: 'center'} }>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      { user ? <AuthNavigator /> : <AppNavigator /> }
    </NavigationContainer>
  );
};