import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { RootStackParamList, TabParamList } from './types';

// Telas do app - área não logada.
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import CatalogScreen from "../screens/catalog/CatalogScreen";
import CartScreen from "../screens/cart/CartScreen";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import OrderInfoScreen from "../screens/cart/OrderInfoScreen";

const AppStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof FontAwesome.glyphMap | undefined;

          if (route.name === "Catalog") {
            iconName = "tags";
          } else if (route.name === "Cart") {
            iconName = "shopping-cart";
          } else if (route.name === "Settings") {
            iconName = "cog";
          } else if (route.name === "Register") {
            iconName = "user-plus";
          }

          return <FontAwesome name={iconName!} size={size} color={color} />;
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
        options={{ title: "Seu Carrinho", headerShown: true }}
      />

      <Tab.Screen 
        name="Settings" 
        component={HomeScreen}
        options={{ title: "Configurações" }}
      />

      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Cadastrar", headerShown: true }}
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

      <AppStack.Screen 
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Concluir pedido" }}
      />

      <AppStack.Screen 
        name="OrderInfo"
        component={OrderInfoScreen}
        options={{ title: "Resumo do pedido" }}
      />
    </AppStack.Navigator>
  );
}

export default function AppNavigator() {
  return <StackNavigator />;
}
