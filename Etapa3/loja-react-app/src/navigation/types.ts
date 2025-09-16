import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Catalog: undefined,
  Cart: undefined,
  Settings: undefined,
  Register: undefined,
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  Details: { itemId: number };
  Login: undefined;
}

export type AuthTabParamList = {
  Home: undefined;
  Settings: undefined;
}

export type AuthStackParamList = {
  Tabs: NavigatorScreenParams<AuthTabParamList>;
  Details: { itemId: number};
}