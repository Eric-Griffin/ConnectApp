import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { theme } from '../theme';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoPlaceholder} />
        <Text style={styles.slogan}>Never go alone.</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('SignUpOptions')}>
          <Text style={styles.primaryButtonText}>Create an account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PhoneNumber', { flow: 'signIn' })}>
          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
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
    backgroundColor: theme.colors.primary,
    marginBottom: 24,
  },
  slogan: {
    fontFamily: theme.fonts.bold,
    fontSize: 24,
    color: theme.colors.black,
    textAlign: 'center',
    lineHeight: 32,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
    fontSize: 16,
  },
  signInText: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  signInLink: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.bold,
  },
});

export default WelcomeScreen;
