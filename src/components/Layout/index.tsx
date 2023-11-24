import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';

import MarketMap from '../MarketMap';
import MarketList from '../MarketList';
import Favorites from '../Favorites';
import { type TabItem } from '../../models/ui/tab-item.model';

const Tab = createBottomTabNavigator();

const tabItems: TabItem[] = [
  {
    name: 'Favorites',
    component: Favorites,
    iconName: 'md-heart-outline',
  },
  {
    name: 'MarketMap',
    component: MarketMap,
    iconName: 'md-map-outline',
  },
  {
    name: 'MarketList',
    component: MarketList,
    iconName: 'md-list-outline',
  },
];

export default function Layout() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="MarketMap"
        screenOptions={{headerShown: false}}
      >
        {tabItems.map((tabItem: TabItem) => (
          <Tab.Screen
            key={tabItem.name}
            name={tabItem.name}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            component={tabItem.component}
            options={{
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
