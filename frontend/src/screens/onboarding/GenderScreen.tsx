import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import { theme } from '../../theme';

const GENDER_OPTIONS = ['Woman', 'Man'];

const GenderOption = ({ text, isSelected, onPress }: any) => (
  <TouchableOpacity
    style={[styles.option, isSelected && styles.selectedOption]}
    onPress={onPress}>
    <Text style={styles.optionText}>{text}</Text>
    {isSelected && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
);

const GenderScreen = ({ navigation }: any) => {
  const { updateOnboardingData } = useOnboarding();
  const [selectedGender, setSelectedGender] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [customGender, setCustomGender] = useState('');

  const handleSelect = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleSaveCustomGender = () => {
    if (customGender) {
      setSelectedGender(customGender);
    }
    setModalVisible(false);
  };

  const handleContinue = () => {
    updateOnboardingData({ gender: selectedGender });
    navigation.navigate('OnboardingInterests');
  };

  const isNextDisabled = !selectedGender;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButtonCircle}>
            <Text style={styles.backButton}>‹</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>I am a</Text>

        {GENDER_OPTIONS.map(option => (
          <GenderOption
            key={option}
            text={option}
            isSelected={selectedGender === option}
            onPress={() => handleSelect(option)}
          />
        ))}

        <TouchableOpacity
          style={styles.option}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.optionText}>Choose another</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {selectedGender && !GENDER_OPTIONS.includes(selectedGender) && (
          <GenderOption
            text={selectedGender}
            isSelected={true}
            onPress={() => setModalVisible(true)}
          />
        )}

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
          onPress={() => navigation.navigate('OnboardingInterests')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>I am a...</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your gender"
              value={customGender}
              onChangeText={setCustomGender}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSaveCustomGender}>
              <Text style={styles.primaryButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.skipText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: theme.colors.black,
    marginBottom: 30,
    lineHeight: 40,
  },
  option: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.lightGray,
  },
  optionText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.black,
  },
  checkmark: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  arrow: {
    fontSize: 20,
    color: theme.colors.gray,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 24,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    marginBottom: 20,
  },
  input: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '100%',
  },
  modalButton: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
});

export default GenderScreen;
