import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

// React Navigation automatically gives a `navigation` object to every screen.
// We just need to tell our component to accept it.
function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.fullScreen}>
      <View style={styles.content}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>C</Text>
        </View>
        <Text style={styles.title}>Connect</Text>
        <Text style={styles.tagline}>Never go alone.</Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* We now use navigation.navigate() to go to a new screen.
            The name 'PhoneNumber' must match the name we gave in App.tsx */}
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => navigation.navigate('PhoneNumber')}
        >
          <Text style={styles.primaryButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.secondaryButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Added background color here
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  tagline: {
    fontSize: 18,
    color: '#8E8E93',
    marginTop: 8,
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
  secondaryButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
