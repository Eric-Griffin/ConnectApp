import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput, // 1. Make sure TextInput is imported
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const NameScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // 2. THIS IS THE FIX: We tell TypeScript these refs will hold a TextInput component.
  const monthInputRef = useRef<TextInput>(null);
  const yearInputRef = useRef<TextInput>(null);

  const isNextDisabled = !firstName || !day || !month || !year;

  const handleDayChange = (text: string) => {
    setDay(text);
    if (text.length === 2) {
      monthInputRef.current?.focus();
    }
  };

  const handleMonthChange = (text: string) => {
    setMonth(text);
    if (text.length === 2) {
      yearInputRef.current?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexOne}
      >
        <View style={styles.content}>
          <Text style={styles.title}>What's your name?</Text>
          
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={styles.label}>Birthday</Text>
          <View style={styles.birthdayContainer}>
            <TextInput
              style={[styles.input, styles.birthdayInput]}
              placeholder="DD"
              keyboardType="number-pad"
              maxLength={2}
              value={day}
              onChangeText={handleDayChange}
            />
            <TextInput
              ref={monthInputRef} // Attach the ref
              style={[styles.input, styles.birthdayInput]}
              placeholder="MM"
              keyboardType="number-pad"
              maxLength={2}
              value={month}
              onChangeText={handleMonthChange}
            />
            <TextInput
              ref={yearInputRef} // Attach the ref
              style={[styles.input, styles.birthdayInput]}
              placeholder="YYYY"
              keyboardType="number-pad"
              maxLength={4}
              value={year}
              onChangeText={setYear}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <View /> 
          <TouchableOpacity
            style={[styles.nextButton, isNextDisabled && styles.disabledButton]}
            disabled={isNextDisabled}
            onPress={() => navigation.navigate('OnboardingEmail')}
          >
            <Text style={styles.nextButtonText}>→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  flexOne: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C2C2E',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8A8A8E',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#EFEFF4',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    marginBottom: 24,
    color: '#2C2C2E',
  },
  birthdayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  birthdayInput: {
    width: '30%',
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#AEAEB2',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 30,
  },
});

export default NameScreen;
