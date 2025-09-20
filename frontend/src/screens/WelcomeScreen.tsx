import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Placeholder for your purple logo */}
        <View style={styles.logoPlaceholder} />

        <Text style={styles.slogan}>Never go alone.</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('SignUpOptions')}
        >
          <Text style={styles.primaryButtonText}>Create an account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('PhoneNumber', { flow: 'signIn' })}>
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA', // Light gray background from design
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#D0A8FF', // Placeholder purple
    marginBottom: 24,
  },
  slogan: {
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 32, 
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#A8D1E7', // Light blue accent
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    fontFamily: 'Sk-Modernist-Bold',
    color: '#FFFFFF',
    fontSize: 16,
  },
  signInText: {
    fontFamily: 'Sk-Modernist-Regular',
    color: '#8E8E93', // Gray text
    fontSize: 14,
    textAlign: 'center',
    // THIS IS THE FIX
    lineHeight: 20, 
  },
  signInLink: {
    color: '#A8D1E7', // Light blue link
    fontFamily: 'Sk-Modernist-Bold',
  },
});

export default WelcomeScreen;
