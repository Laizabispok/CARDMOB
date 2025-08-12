import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined,
  Settings: undefined,
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  Details: { itemId: number };
}