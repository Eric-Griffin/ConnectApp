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

const GENDER_OPTIONS = ['Woman', 'Man'];

const GenderOption = ({ text, isSelected, onPress }: any) => (
  <TouchableOpacity 
    style={[styles.option, isSelected && styles.selectedOption]}
    onPress={onPress}
  >
    <Text style={styles.optionText}>{text}</Text>
    {isSelected && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
);

const GenderScreen = ({ navigation }: any) => {
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
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.optionText}>Choose another</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Display the custom gender if it's selected */}
        {selectedGender && !GENDER_OPTIONS.includes(selectedGender) && (
            <GenderOption 
                text={selectedGender}
                isSelected={true}
                onPress={() => setModalVisible(true)}
            />
        )}

        <TouchableOpacity
          style={[styles.primaryButton, isNextDisabled && styles.disabledButton]}
          disabled={isNextDisabled}
          onPress={() => navigation.navigate('OnboardingInterests')}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OnboardingInterests')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for entering a custom gender */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>I am a...</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your gender"
              value={customGender}
              onChangeText={setCustomGender}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSaveCustomGender}>
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
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Sk-Modernist-Bold',
    color: '#000000',
    marginBottom: 30,
    lineHeight: 40,
  },
  option: {
    backgroundColor: '#F7F8FA',
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
    borderColor: '#A8D1E7',
    backgroundColor: '#EBF5FA',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#000000',
  },
  checkmark: {
    fontSize: 16,
    color: '#A8D1E7',
  },
  arrow: {
    fontSize: 20,
    color: '#8E8E93',
  },
  primaryButton: {
    backgroundColor: '#A8D1E7',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
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
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Sk-Modernist-Bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#A8D1E7',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
});

export default GenderScreen;
