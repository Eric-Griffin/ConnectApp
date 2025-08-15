import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DiscoverScreen from '../screens/DiscoverScreen';
import MyEventsStackNavigator from './MyEventsStackNavigator';
import MatchesScreen from '../screens/MatchesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// This component is now very simple. It just renders the tabs.
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="My Events" component={MyEventsStackNavigator} />
      <Tab.Screen name="Matches" component={MatchesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
