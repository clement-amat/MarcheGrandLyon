import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';

import MarketMap from '../MarketMap';
import MarketList from '../MarketList';
import Favorites from '../Favorites';
import { type TabItem } from '../../models/ui/tab-item.model';
import { DefaultTheme } from '../../styles/default-theme';
import { NotoSans_400Regular, useFonts } from '@expo-google-fonts/noto-sans';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const tabItems: TabItem[] = [
  {
    name: 'Mes Favoris',
    component: Favorites,
    iconName: 'md-heart-outline',
  },
  {
    name: 'Plan',
    component: MarketMap,
    iconName: 'md-map-outline',
  },
  {
    name: 'Liste',
    component: MarketList,
    iconName: 'md-list-outline',
  },
];

export default function Layout() {
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Plan"
        screenOptions={{headerShown: false}}>
        {tabItems.map((tabItem: TabItem) => (
          <Tab.Screen
            key={tabItem.name}
            name={tabItem.name}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            component={tabItem.component}
            options={{
              tabBarActiveTintColor: DefaultTheme.primary,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={tabItem.iconName} size={size} color={color} />
              ),
              tabBarShowLabel: false
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
