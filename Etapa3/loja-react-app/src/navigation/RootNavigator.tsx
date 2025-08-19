import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from './types';

// Telas do app.
import HomeScreen from "../screens/HomeScreen";
// importar depois que implementar: DetailsScreen, SettingsScreen
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

const AppStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Settings" component={HomeScreen} />
            <Tab.Screen name="Register" component={RegisterScreen} />
        </Tab.Navigator>
    );
}

function AppNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Details"
        component={HomeScreen}
        options={{ title: 'Detalhes' }}
      />
      <AppStack.Screen 
        name="Login"
        component={LoginScreen}
        options={{ title: "Acessar" }}
      />
    </AppStack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};