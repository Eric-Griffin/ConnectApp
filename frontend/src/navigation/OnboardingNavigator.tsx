import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all of our new onboarding screens
import NameScreen from '../screens/onboarding/NameScreen';
import EmailScreen from '../screens/onboarding/EmailScreen';
import InterestsScreen from '../screens/onboarding/InterestsScreen';
import HabitsScreen from '../screens/onboarding/HabitsScreen';
import PromptsScreen from '../screens/onboarding/PromptsScreen';
import PhotosScreen from '../screens/onboarding/PhotosScreen';

const Stack = createNativeStackNavigator();

function OnboardingNavigator() {
  return (
    // This stack defines the order of the profile creation steps
    <Stack.Navigator 
      screenOptions={{
        headerShown: false, // We hide the default header to use our own custom UI
      }}
    >
      <Stack.Screen name="OnboardingName" component={NameScreen} />
      <Stack.Screen name="OnboardingEmail" component={EmailScreen} />
      <Stack.Screen name="OnboardingInterests" component={InterestsScreen} />
      <Stack.Screen name="OnboardingHabits" component={HabitsScreen} />
      <Stack.Screen name="OnboardingPrompts" component={PromptsScreen} />
      <Stack.Screen name="OnboardingPhotos" component={PhotosScreen} />
    </Stack.Navigator>
  );
}

export default OnboardingNavigator;
