import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Button, // Using a simple button for the calendar
} from 'react-native';

// A simple placeholder for a calendar. We can replace this with a real library later.
const BirthdayPickerModal = ({ visible, onClose, onSave }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Birthday</Text>
          {/* This is a placeholder for a real calendar component */}
          <View style={styles.calendarPlaceholder}>
            <Text>A real calendar would go here.</Text>
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={onSave}>
            <Text style={styles.primaryButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.skipText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const ProfileDetailsScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleSaveBirthday = () => {
    // In a real app, you'd get the date from the calendar.
    // For now, we'll just set a placeholder.
    setBirthday('July 11, 1995');
    setPickerVisible(false);
  };

  const isNextDisabled = !firstName || !lastName || !birthday;

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
        <Text style={styles.title}>Profile details</Text>

        <TextInput
          style={styles.input}
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
        />

        <TouchableOpacity 
          style={styles.birthdayButton}
          onPress={() => setPickerVisible(true)}
        >
          <Text style={styles.birthdayButtonIcon}>🗓️</Text>
          <Text style={styles.birthdayButtonText}>
            {birthday || 'Choose birthday date'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, isNextDisabled && styles.disabledButton]}
          disabled={isNextDisabled}
          onPress={() => navigation.navigate('OnboardingGender')} // We will create this screen next
        >
          <Text style={styles.primaryButtonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OnboardingGender')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <BirthdayPickerModal 
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSave={handleSaveBirthday}
      />
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
  input: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  birthdayButton: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  birthdayButtonIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  birthdayButtonText: {
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#8E8E93',
  },
  primaryButton: {
    backgroundColor: '#A8D1E7',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto', // Pushes this to the bottom
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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  calendarPlaceholder: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default ProfileDetailsScreen;
