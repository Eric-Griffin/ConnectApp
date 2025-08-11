import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// This screen now accepts the `navigation` object
function OTPScreen({ navigation }: any) {
    const [otp, setOtp] = useState('');

    return (
      <View style={styles.fullScreen}>
        <View style={styles.onboardingContent}>
          <Text style={styles.onboardingTitle}>Enter your code</Text>
          <Text style={styles.tagline}>We sent a 6-digit code to your number.</Text>
          <TextInput
              style={styles.otpInput}
              placeholder="_ _ _ _ _ _"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => navigation.navigate('ProfileCreation')}
          >
            <Text style={styles.primaryButtonText}>Verify</Text>
          </TouchableOpacity>
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
    tagline: {
        fontSize: 18,
        color: '#8E8E93',
        marginTop: 8,
    },
    otpInput: {
        fontSize: 34,
        fontWeight: 'bold',
        letterSpacing: 10,
        textAlign: 'center',
        marginTop: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#1A1A1A',
        paddingBottom: 10,
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

export default OTPScreen;
