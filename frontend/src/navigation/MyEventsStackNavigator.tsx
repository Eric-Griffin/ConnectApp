import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyEventsScreen from '../screens/MyEventsScreen';
import PeopleDeckScreen from '../screens/PeopleDeckScreen';

const Stack = createNativeStackNavigator();

// This component is now very simple. It just defines the two screens in this stack.
function MyEventsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyEventsList" component={MyEventsScreen} />
      <Stack.Screen name="PeopleDeck" component={PeopleDeckScreen} />
    </Stack.Navigator>
  );
}

export default MyEventsStackNavigator;
