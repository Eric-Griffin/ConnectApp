import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

// This screen now accepts the `navigation` object
function SignInScreen({ navigation }: any) {
  return (
    <View style={styles.fullScreenCentered}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.tagline}>This screen is under construction.</Text>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.secondaryButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenCentered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  title: { 
    fontSize: 48, 
    fontWeight: 'bold', 
    color: '#1A1A1A' 
  },
  tagline: { 
    fontSize: 18, 
    color: '#8E8E93', 
    marginTop: 8 
  },
  backButton: { 
    marginTop: 20, 
    alignItems: 'center', 
    padding: 10 
  },
  secondaryButtonText: { 
    color: '#007AFF', 
    fontSize: 18, 
    fontWeight: '600' 
  },
});

export default SignInScreen;
