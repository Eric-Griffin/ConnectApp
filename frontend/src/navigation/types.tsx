// This file defines the "shape" of our navigation stacks.
// It tells TypeScript which screens exist in each navigator and what data they expect.

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 1. Types for the main Stack Navigator in App.tsx
export type RootStackParamList = {
  Welcome: undefined;
  SignUpOptions: undefined;
  SignIn: undefined;
  PhoneNumber: undefined;
  OTP: undefined;
  OnboardingProfileDetails: undefined;
  OnboardingGender: undefined;
  OnboardingInterests: undefined;
  OnboardingHabits: undefined;
  OnboardingPrompts: undefined;
  OnboardingPhotos: undefined;
  OnboardingNotifications: undefined;
  MainApp: undefined;
  Chat: { user: any };
  EditProfile: undefined;
  Settings: undefined;
  EventMatches: { eventName: string; matchesForEvent: any[] };
  Match: { user2: any };
  Profile: undefined; // Added from CustomHeader
  PeopleDeck: { eventId: string }; // Added from MyEventsScreen
};

// 2. A generic type for screens that use the main stack navigation
export type RootStackScreenProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: any; // Can be refined later if needed
};
