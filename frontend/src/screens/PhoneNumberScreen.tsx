import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';

const PhoneNumberScreen = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { updateOnboardingData } = useOnboarding();

  const isNextDisabled = phoneNumber.length < 10;

  const handleContinue = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5001/api/auth/register-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: `+1${phoneNumber}` }),
      });

      const data = await response.json();

      if (response.ok) {
        updateOnboardingData({ user: data.user, token: data.token });
        navigation.navigate('OTP');
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to the server');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Number</Text>
        <View style={{width: 20}} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>My mobile</Text>
        <Text style={styles.subtitle}>
          Please enter your valid phone number. We will send you a 4-digit code to verify your account.
        </Text>

        <View style={styles.phoneInputContainer}>
          <View style={styles.countryCodePicker}>
            <Text style={styles.countryCodeText}>🇺🇸 (+1)</Text>
            <Text style={styles.dropdownArrow}>▾</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, isNextDisabled && styles.disabledButton]}
          disabled={isNextDisabled}
          onPress={handleContinue}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#F7F8FA',
  },
  backButton: {
    fontSize: 30,
    color: '#000000',
    fontFamily: 'Sk-Modernist-Regular',
  },
  headerTitle: {
    fontSize: 18,
    color: '#8E8E93',
    fontFamily: 'Sk-Modernist-Regular',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
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
    marginBottom: 40,
    lineHeight: 22,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 10,
  },
  countryCodePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  countryCodeText: {
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    marginRight: 5,
  },
  dropdownArrow: {
    fontSize: 12,
  },
  phoneInput: {
    flex: 1,
    padding: 18,
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#000000',
  },
  primaryButton: {
    backgroundColor: '#A8D1E7',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
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

export default PhoneNumberScreen;
