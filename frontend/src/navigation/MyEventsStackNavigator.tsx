import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyEventsScreen from '../screens/MyEventsScreen';
import PeopleDeckScreen from '../screens/PeopleDeckScreen';

const Stack = createNativeStackNavigator();

// This component receives the data and functions from its parent (MainTabNavigator)
// and passes them down to the screens within this stack.
function MyEventsStackNavigator({ likedEvents, onMatch }: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyEventsList">
        {(props) => <MyEventsScreen {...props} likedEvents={likedEvents} />}
      </Stack.Screen>
      <Stack.Screen name="PeopleDeck">
        {(props) => <PeopleDeckScreen {...props} onMatch={onMatch} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default MyEventsStackNavigator;
