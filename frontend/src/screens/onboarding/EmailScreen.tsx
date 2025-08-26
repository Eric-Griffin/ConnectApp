import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const EmailScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  const handleNext = () => {
    navigation.navigate('OnboardingInterests');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexOne}
      >
        <View style={styles.content}>
          <Text style={styles.title}>What's your email?</Text>
          <Text style={styles.subtitle}>We'll use this to recover your account if you can't log in.</Text>
          
          <Text style={styles.label}>Your Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nextButton, !email && styles.disabledButton]}
            disabled={!email}
            onPress={handleNext}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8A8A8E',
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
  footer: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8A8A8E',
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

export default EmailScreen;
