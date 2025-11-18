import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthStackParamList, AuthTabParamList } from './types';

// Telas do app - área logada.
import HomeScreen from "../screens/HomeScreen";
// importar depois que implementar: DetailsScreen, SettingsScreen
import ProfileScreen from "../screens/auth/ProfileScreen";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import OrderInfoScreen from "../screens/cart/OrderInfoScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<AuthTabParamList>();

function AuthTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={ProfileScreen}
              options={{ title: 'Área Logada' }}
            />
            <Tab.Screen name="Settings" component={HomeScreen} />
        </Tab.Navigator>
    );
}

function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={AuthTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={HomeScreen}
        options={{ title: 'Detalhes' }}
      />
      <Stack.Screen 
        name="Checkout"
        component={CheckoutScreen}
        options={{title: 'Concluir pedido'}}
      />
      <Stack.Screen 
        name="OrderInfo"
        component={OrderInfoScreen}
        options={{title: 'Resumo do pedido'}}
      />
    </Stack.Navigator>
  );
}

export default function AuthNavigator() {
  return (
    <AuthStackNavigator />
  );
};