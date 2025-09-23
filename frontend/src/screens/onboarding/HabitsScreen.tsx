import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { useOnboarding } from '../../context/OnboardingContext';
import { theme } from '../../theme';

const DRINKING_OPTIONS = [
  'Yes, I drink',
  'I drink sometimes',
  'I rarely drink',
  'No, I don\'t drink',
  'I\'m sober',
];
const SMOKING_OPTIONS = [
  'I smoke sometimes',
  'No, I don\'t smoke',
  'Yes, I smoke',
  'I\'m trying to quit',
];
const WORKOUT_OPTIONS = [
  'Every day',
  'A few times a week',
  'Occasionally',
  'Never',
];

const HabitPill = ({ text, isSelected, onPress }: any) => (
  <TouchableOpacity
    style={[styles.pill, isSelected && styles.selectedPill]}
    onPress={onPress}>
    <View>
      <Text style={[styles.pillText, isSelected && styles.selectedPillText]}>
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

const HabitSection = ({ title, options, selectedOption, onSelect }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.pillsContainer}>
      {options.map((option: string) => (
        <HabitPill
          key={option}
          text={option}
          isSelected={selectedOption === option}
          onPress={() => onSelect(option)}
        />
      ))}
    </View>
  </View>
);

const HabitsScreen = ({ navigation }: any) => {
  const route = useRoute();
  const { isEditMode } = route.params || {};
  const { user, updateUser } = useApp();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const [habits, setHabits] = useState({
    drinking: null,
    smoking: null,
    workout: null,
  });

  useEffect(() => {
    if (isEditMode && user) {
      setHabits(user.habits || { drinking: null, smoking: null, workout: null });
    } else if (onboardingData) {
      setHabits(onboardingData.habits || { drinking: null, smoking: null, workout: null });
    }
  }, [isEditMode, user, onboardingData]);

  const handleSelect = (habit, value) => {
    setHabits(prev => ({ ...prev, [habit]: value }));
  };

  const handleSave = async () => {
    if (isEditMode) {
      await updateUser({ habits });
      navigation.goBack();
    } else {
      updateOnboardingData({ habits });
      navigation.navigate('Prompts');
    }
  };

  const isNextDisabled = !habits.drinking || !habits.smoking || !habits.workout;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButtonCircle}>
            <Text style={styles.backButton}>‹</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{isEditMode ? 'Edit Your Lifestyle' : 'Your lifestyle'}</Text>
        <Text style={styles.subtitle}>
          Share as much as you're comfortable with. This helps us find better
          connections for you.
        </Text>

        <HabitSection
          title="Drinking"
          options={DRINKING_OPTIONS}
          selectedOption={habits.drinking}
          onSelect={(value) => handleSelect('drinking', value)}
        />

        <HabitSection
          title="Smoking"
          options={SMOKING_OPTIONS}
          selectedOption={habits.smoking}
          onSelect={(value) => handleSelect('smoking', value)}
        />

        <HabitSection
          title="Workout"
          options={WORKOUT_OPTIONS}
          selectedOption={habits.workout}
          onSelect={(value) => handleSelect('workout', value)}
        />
      </ScrollView>

      <View style={styles.footer}>
        {!isEditMode && (
          <TouchableOpacity
            onPress={() => navigation.navigate('OnboardingPrompts')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.primaryButton,
            isNextDisabled && styles.disabledButton,
          ]}
          disabled={isNextDisabled}
          onPress={handleSave}>
          <Text style={styles.primaryButtonText}>{isEditMode ? 'Save' : 'Continue'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    padding: 20,
    alignItems: 'flex-start',
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 24,
    color: theme.colors.black,
  },
  content: {
    padding: 24,
    paddingTop: 0,
  },
  title: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: theme.colors.black,
    marginBottom: 8,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
    marginBottom: 30,
    lineHeight: 22,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: theme.colors.black,
    marginBottom: 15,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedPill: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  pillText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.black,
  },
  selectedPillText: {
    color: theme.colors.white,
  },
  footer: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  skipText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fonts.bold,
  },
  disabledButton: {
    backgroundColor: theme.colors.primary,
    opacity: 0.5,
  },
});

export default HabitsScreen;
