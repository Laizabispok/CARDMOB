import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { RootStackParamList, TabParamList } from './types';


import HomeScreen from "../screens/HomeScreen";

import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import CatalogScreen from "../screens/catalog/CatalogScreen";
import CartScreen from "../screens/cart/CartScreen";

const AppStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName: any;

          if (route.name === "Catalog") {
            iconName = focused ? "tags" : "tags";
          } else if (route.name === "Cart") {
            iconName = focused ? "shopping-cart" : "shopping-cart";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "grey",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Catalog"
        component={CatalogScreen}
        options={{ title: "Menu" }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Seu Carrinho" }}
      />
      <Tab.Screen
        name="Settings"
        component={HomeScreen}
        options={{ title: "Configurações" }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Registrar" }}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
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
        options={{ title: "Detalhes" }}
      />
      <AppStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Acessar" }}
      />
    </AppStack.Navigator>
  );
}

export default function AppNavigator() {
  return <StackNavigator />;
}
