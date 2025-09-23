import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import { theme } from '../../theme';

const PREDEFINED_INTERESTS = [
  'Photography',
  'Shopping',
  'Karaoke',
  'Yoga',
  'Cooking',
  'Tennis',
  'Run',
  'Swimming',
  'Art',
  'Traveling',
  'Extreme',
  'Music',
  'Drink',
  'Video games',
];

const InterestPill = ({ text, isSelected, onPress }: any) => (
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

const InterestsScreen = ({ navigation }: any) => {
  const { updateOnboardingData } = useOnboarding();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allInterests, setAllInterests] =
    useState<string[]>(PREDEFINED_INTERESTS);

  const handleSelectInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter(item => item !== interest),
      );
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const addCustomInterest = () => {
    if (
      searchTerm &&
      !selectedInterests.includes(searchTerm) &&
      selectedInterests.length < 5
    ) {
      if (!allInterests.includes(searchTerm)) {
        setAllInterests([searchTerm, ...allInterests]);
      }
      setSelectedInterests([...selectedInterests, searchTerm]);
      setSearchTerm('');
    }
  };

  const handleContinue = () => {
    updateOnboardingData({ interestTags: selectedInterests });
    navigation.navigate('OnboardingHabits');
  };

  const filteredInterests = useMemo(
    () =>
      allInterests.filter(interest =>
        interest.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm, allInterests],
  );

  const isNextDisabled = selectedInterests.length < 1;

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
        <Text style={styles.title}>Your interests</Text>
        <Text style={styles.subtitle}>
          Select a few of your interests and let everyone know what you're
          passionate about.
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search interests..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          {searchTerm &&
            !allInterests
              .map(i => i.toLowerCase())
              .includes(searchTerm.toLowerCase()) && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={addCustomInterest}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            )}
        </View>

        <View style={styles.pillsContainer}>
          {filteredInterests.map(interest => (
            <InterestPill
              key={interest}
              text={interest}
              isSelected={selectedInterests.includes(interest)}
              onPress={() => handleSelectInterest(interest)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.primaryButton,
            isNextDisabled && styles.disabledButton,
          ]}
          disabled={isNextDisabled}
          onPress={handleContinue}>
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('OnboardingHabits')}>
          <Text style={styles.skipText}>Skip</Text>
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
    paddingHorizontal: 24,
    paddingBottom: 100,
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
    marginBottom: 24,
    lineHeight: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.black,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  addButtonText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.bold,
    fontSize: 16,
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
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
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
  skipText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
});

export default InterestsScreen;
