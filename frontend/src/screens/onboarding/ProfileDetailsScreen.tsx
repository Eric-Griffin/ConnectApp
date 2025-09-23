import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import { theme } from '../../theme';

const BirthdayPickerModal = ({ visible, onClose, onSave }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Birthday</Text>
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
  const { updateOnboardingData } = useOnboarding();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleSaveBirthday = () => {
    setBirthday('July 11, 1995');
    setPickerVisible(false);
  };

  const handleConfirm = () => {
    updateOnboardingData({ name: `${firstName} ${lastName}`, birthday });
    navigation.navigate('OnboardingGender');
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
          onPress={() => setPickerVisible(true)}>
          <Text style={styles.birthdayButtonIcon}>🗓️</Text>
          <Text style={styles.birthdayButtonText}>
            {birthday || 'Choose birthday date'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.primaryButton,
            isNextDisabled && styles.disabledButton,
          ]}
          disabled={isNextDisabled}
          onPress={handleConfirm}>
          <Text style={styles.primaryButtonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('OnboardingGender')}>
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
  input: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  birthdayButton: {
    backgroundColor: theme.colors.lightGray,
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
    fontFamily: theme.fonts.regular,
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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
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
    backgroundColor: theme.colors.lightGray,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default ProfileDetailsScreen;
