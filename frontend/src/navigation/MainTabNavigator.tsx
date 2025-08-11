import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DiscoverScreen from '../screens/DiscoverScreen';
import MatchesScreen from '../screens/MatchesScreen';

// 1. Import the new Stack Navigator we just created
import MyEventsStackNavigator from './MyEventsStackNavigator';

const Tab = createBottomTabNavigator();

// This component now receives the onMatch function to pass down
function MainTabNavigator({ likedEvents, matches, onSwipeRightEvent, onMatch }: any) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen name="Discover">
        {(props) => <DiscoverScreen {...props} onSwipeRight={onSwipeRightEvent} />}
      </Tab.Screen>
      
      {/* 2. The "My Events" tab now renders our new Stack Navigator */}
      <Tab.Screen name="My Events">
        {/* We pass the necessary data and functions down to the stack */}
        {(props) => (
          <MyEventsStackNavigator 
            {...props} 
            likedEvents={likedEvents} 
            onMatch={onMatch} 
          />
        )}
      </Tab.Screen>
      
      <Tab.Screen name="Matches">
        {(props) => <MatchesScreen {...props} matches={matches} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
