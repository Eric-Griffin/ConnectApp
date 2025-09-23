import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppProvider } from './src/context/AppContext';
import { OnboardingProvider } from './src/context/OnboardingContext';

// Import all screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpOptionsScreen from './src/screens/SignUpOptionScreen';
import SignInScreen from './src/screens/SignInScreen';
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import OTPScreen from './src/screens/OTPScreen';
import ProfileDetailsScreen from './src/screens/onboarding/ProfileDetailsScreen';
import GenderScreen from './src/screens/onboarding/GenderScreen';
import InterestsScreen from './src/screens/onboarding/InterestsScreen';
import HabitsScreen from './src/screens/onboarding/HabitsScreen';
import PromptsScreen from './src/screens/onboarding/PromptsScreen';
import PhotosScreen from './src/screens/onboarding/PhotosScreen';
import NotificationsScreen from './src/screens/onboarding/NotificationsScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import MatchScreen from './src/screens/MatchScreen';
import ChatScreen from './src/screens/ChatScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import EventMatchesScreen from './src/screens/EventMatchesScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Initial screens */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUpOptions" component={SignUpOptionsScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      
      {/* Phone verification flow */}
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />

      {/* New multi-step profile creation flow */}
      <Stack.Screen name="OnboardingProfileDetails" component={ProfileDetailsScreen} />
      <Stack.Screen name="OnboardingGender" component={GenderScreen} />
      <Stack.Screen name="OnboardingInterests" component={InterestsScreen} />
      <Stack.Screen name="OnboardingHabits" component={HabitsScreen} />
      <Stack.Screen name="OnboardingPrompts" component={PromptsScreen} />
      <Stack.Screen name="OnboardingPhotos" component={PhotosScreen} />
      <Stack.Screen name="OnboardingNotifications" component={NotificationsScreen} />

      {/* Main App */}
      <Stack.Screen name="MainApp" component={MainTabNavigator} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
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
        <OnboardingProvider>
          <NavigationContainer>
            <StatusBar barStyle={'dark-content'} />
            <AppNavigator />
          </NavigationContainer>
        </OnboardingProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
}

export default App;
