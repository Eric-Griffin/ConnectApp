import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppProvider } from './src/context/AppContext';

import WelcomeScreen from './src/screens/WelcomeScreen'; 
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import OTPScreen from './src/screens/OTPScreen';
import ProfileCreationScreen from './src/screens/ProfileCreationScreen';
import SignInScreen from './src/screens/SignInScreen';
import MatchScreen from './src/screens/MatchScreen';
import ChatScreen from './src/screens/ChatScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import EditProfileScreen from './src/screens/EditProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import EventMatchesScreen from './src/screens/EventMatchesScreen'; // Import the new screen

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ProfileCreation" component={ProfileCreationScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="MainApp" component={MainTabNavigator} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      {/* Add the new EventMatches screen to the stack */}
      <Stack.Screen name="EventMatches" component={EventMatchesScreen} />
      
      <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
        <Stack.Screen name="Match" component={MatchScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavigationContainer>
          <StatusBar barStyle={'dark-content'} />
          <AppNavigator />
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
}

export default App;
