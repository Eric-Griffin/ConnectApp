import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const NotificationsScreen = ({ navigation }: any) => {
  const handleAllow = () => {
    // In a real app, this would trigger the native permission pop-up.
    // For now, we'll just navigate to the main app.
    navigation.navigate('MainApp');
  };

  const handleSkip = () => {
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
        {/* Placeholder for the chat bubble graphic */}
        <View style={styles.graphicPlaceholder} />

        <Text style={styles.title}>Enable notifications</Text>
        <Text style={styles.subtitle}>
          Get push-notifications when you get a match or receive a message.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleAllow}
        >
          <Text style={styles.primaryButtonText}>I want to be notified</Text>
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
    padding: 20,
    alignItems: 'flex-end',
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#8E8E93',
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
    backgroundColor: '#F0F0F0', // Placeholder color
    borderRadius: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Sk-Modernist-Bold',
    color: '#000000',
    marginBottom: 16,
    lineHeight: 36,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '80%',
  },
  footer: {
    padding: 24,
  },
  primaryButton: {
    backgroundColor: '#A8D1E7',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Bold',
  },
});

export default NotificationsScreen;
