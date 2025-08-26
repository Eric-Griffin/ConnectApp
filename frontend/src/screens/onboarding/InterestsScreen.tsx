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

const PREDEFINED_INTERESTS = [
  'Photography', 'Shopping', 'Karaoke', 'Yoga', 'Cooking', 'Tennis',
  'Run', 'Swimming', 'Art', 'Traveling', 'Extreme', 'Music',
  'Drink', 'Video games'
];

// THIS IS THE CORRECTED COMPONENT
const InterestPill = ({ text, isSelected, onPress }: any) => (
  <TouchableOpacity 
    style={[styles.pill, isSelected && styles.selectedPill]}
    onPress={onPress}
  >
    {/* By wrapping the Text in a View, we ensure it has proper spacing */}
    <View>
      <Text style={[styles.pillText, isSelected && styles.selectedPillText]}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const InterestsScreen = ({ navigation }: any) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allInterests, setAllInterests] = useState<string[]>(PREDEFINED_INTERESTS);

  const handleSelectInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  const addCustomInterest = () => {
    if (searchTerm && !selectedInterests.includes(searchTerm) && selectedInterests.length < 5) {
      if (!allInterests.includes(searchTerm)) {
        setAllInterests([searchTerm, ...allInterests]);
      }
      setSelectedInterests([...selectedInterests, searchTerm]);
      setSearchTerm('');
    }
  };

  const filteredInterests = useMemo(() => 
    allInterests.filter(interest => 
      interest.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm, allInterests]);

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
        <Text style={styles.subtitle}>Select a few of your interests and let everyone know what you're passionate about.</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search interests..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          {searchTerm && !allInterests.map(i => i.toLowerCase()).includes(searchTerm.toLowerCase()) && (
            <TouchableOpacity style={styles.addButton} onPress={addCustomInterest}>
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
          style={[styles.primaryButton, isNextDisabled && styles.disabledButton]}
          disabled={isNextDisabled}
          onPress={() => navigation.navigate('OnboardingHabits')}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OnboardingHabits')}>
          <Text style={styles.skipText}>Skip</Text>
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
    paddingHorizontal: 24,
    paddingBottom: 100, 
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
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#000000',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#A8D1E7',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 16,
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
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
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
  skipText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#8E8E93',
  },
});

export default InterestsScreen;
