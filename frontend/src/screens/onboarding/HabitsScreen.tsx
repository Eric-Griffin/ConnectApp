import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const DRINKING_OPTIONS = ['Yes, I drink', 'I drink sometimes', 'I rarely drink', 'No, I don\'t drink', 'I\'m sober'];
const SMOKING_OPTIONS = ['I smoke sometimes', 'No, I don\'t smoke', 'Yes, I smoke', 'I\'m trying to quit'];
const WORKOUT_OPTIONS = ['Every day', 'A few times a week', 'Occasionally', 'Never'];

const HabitPill = ({ text, isSelected, onPress }: any) => (
  <TouchableOpacity 
    style={[styles.pill, isSelected && styles.selectedPill]}
    onPress={onPress}
  >
    <View>
      <Text style={[styles.pillText, isSelected && styles.selectedPillText]}>{text}</Text>
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
  const [drinking, setDrinking] = useState(null);
  const [smoking, setSmoking] = useState(null);
  const [workout, setWorkout] = useState(null);

  const isNextDisabled = !drinking || !smoking || !workout;

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
        <Text style={styles.title}>Your lifestyle</Text>
        <Text style={styles.subtitle}>Share as much as you're comfortable with. This helps us find better connections for you.</Text>
        
        <HabitSection 
          title="Drinking"
          options={DRINKING_OPTIONS}
          selectedOption={drinking}
          onSelect={setDrinking}
        />

        <HabitSection 
          title="Smoking"
          options={SMOKING_OPTIONS}
          selectedOption={smoking}
          onSelect={setSmoking}
        />
        
        <HabitSection 
          title="Workout"
          options={WORKOUT_OPTIONS}
          selectedOption={workout}
          onSelect={setWorkout}
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('OnboardingPrompts')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.primaryButton, isNextDisabled && styles.disabledButton]}
          disabled={isNextDisabled}
          onPress={() => navigation.navigate('OnboardingPrompts')}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    alignItems: 'flex-start',
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 24,
    color: '#000000',
  },
  content: {
    padding: 24,
    paddingTop: 0,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Sk-Modernist-Bold',
    color: '#000000',
    marginBottom: 8,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#8E8E93',
    marginBottom: 30,
    lineHeight: 22,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Sk-Modernist-Bold',
    color: '#000000',
    marginBottom: 15,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedPill: {
    backgroundColor: '#A8D1E7',
    borderColor: '#A8D1E7',
  },
  pillText: {
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#000000',
  },
  selectedPillText: {
    color: '#FFFFFF',
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
    fontFamily: 'Sk-Modernist-Regular',
    color: '#8E8E93',
  },
  primaryButton: {
    backgroundColor: '#A8D1E7',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Bold',
  },
  disabledButton: {
    backgroundColor: '#DCEBFF',
  },
});

export default HabitsScreen;
