import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import { theme } from '../../theme';

const NotificationsScreen = ({ navigation }: any) => {
  const { submitOnboardingData } = useOnboarding();

  const handleAllow = async () => {
    await submitOnboardingData();
    navigation.navigate('MainApp');
  };

  const handleSkip = async () => {
    await submitOnboardingData();
    navigation.navigate('MainApp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.graphicPlaceholder} />

        <Text style={styles.title}>Enable notifications</Text>
        <Text style={styles.subtitle}>
          Get push-notifications when you get a match or receive a message.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleAllow}>
          <Text style={styles.primaryButtonText}>I want to be notified</Text>
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
  header: {
    padding: 20,
    alignItems: 'flex-end',
  },
  skipText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  graphicPlaceholder: {
    width: 180,
    height: 180,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: theme.colors.black,
    marginBottom: 16,
    lineHeight: 36,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '80%',
  },
  footer: {
    padding: 24,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fonts.bold,
  },
});

export default NotificationsScreen;
