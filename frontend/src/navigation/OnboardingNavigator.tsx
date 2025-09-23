import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all of our new onboarding screens
import NameScreen from '../screens/onboarding/NameScreen';
import EmailScreen from '../screens/onboarding/EmailScreen';
import InterestsScreen from '../screens/onboarding/InterestsScreen';
import HabitsScreen from '../screens/onboarding/HabitsScreen';
import PromptsScreen from '../screens/onboarding/PromptsScreen';
import PhotosScreen from '../screens/onboarding/PhotosScreen';
import NotificationsScreen from '../screens/onboarding/NotificationsScreen';

const Stack = createNativeStackNavigator();

function OnboardingNavigator() {
  return (
    // This stack defines the order of the profile creation steps
    <Stack.Navigator 
      screenOptions={{
        headerShown: false, // We hide the default header to use our own custom UI
      }}
    >
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Interests" component={InterestsScreen} />
      <Stack.Screen name="Habits" component={HabitsScreen} />
      <Stack.Screen name="Prompts" component={PromptsScreen} />
      <Stack.Screen name="Photos" component={PhotosScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

export default OnboardingNavigator;
