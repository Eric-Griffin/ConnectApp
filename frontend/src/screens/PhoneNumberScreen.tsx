import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// This screen now also accepts the `navigation` object
function PhoneNumberScreen({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.fullScreen}>
      <View style={styles.onboardingContent}>
        <Text style={styles.onboardingTitle}>What's your number?</Text>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => navigation.navigate('OTP')}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
        {/* navigation.goBack() is the standard way to go to the previous screen */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  onboardingContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  onboardingTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#1A1A1A',
    paddingBottom: 10,
  },
  countryCode: {
    fontSize: 24,
    marginRight: 10,
    color: '#1A1A1A',
  },
  phoneInput: {
    fontSize: 24,
    flex: 1,
    color: '#1A1A1A',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PhoneNumberScreen;
