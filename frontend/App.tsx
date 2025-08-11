import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomeScreen'; 
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import OTPScreen from './src/screens/OTPScreen';
import ProfileCreationScreen from './src/screens/ProfileCreationScreen';
import SignInScreen from './src/screens/SignInScreen';
import MatchScreen from './src/screens/MatchScreen';
import ChatScreen from './src/screens/ChatScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [likedEvents, setLikedEvents] = useState([]);
  const [matches, setMatches] = useState([]);

  const handleSwipeRightEvent = (event: any) => {
    // Avoid adding duplicate events
    if (!likedEvents.find(e => e.id === event.id)) {
      setLikedEvents(prevEvents => [...prevEvents, event]);
    }
  };

  const handleMatch = (person: any, navigation: any) => {
    // Avoid adding duplicate matches
    if (!matches.find(m => m.id === person.id)) {
      setMatches(prevMatches => [...prevMatches, person]);
    }
    navigation.navigate('Match', { user2: person });
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth stack */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="ProfileCreation" component={ProfileCreationScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />

        {/* Main app (Tab Navigator) */}
        <Stack.Screen name="MainApp">
          {(props) => (
            <MainTabNavigator 
              {...props} 
              likedEvents={likedEvents}
              matches={matches}
              onSwipeRightEvent={handleSwipeRightEvent}
              onMatch={handleMatch} // Pass the onMatch function down
            />
          )}
        </Stack.Screen>
        
        {/* Chat screen is still needed in the main stack */}
        <Stack.Screen name="Chat" component={ChatScreen} />
        
        {/* Match screen is a modal on top of everything */}
        <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
          <Stack.Screen name="Match" component={MatchScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
