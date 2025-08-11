import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

function MatchScreen({ route, navigation }: any) {
  const { user2 } = route.params;
  const user1 = { 
    name: 'You', 
    image: 'https://placehold.co/200x200/007AFF/FFFFFF?text=You' 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>It's a Match!</Text>
      <Text style={styles.subtitle}>You and {user2.name} are both interested in the same event.</Text>
      
      <View style={styles.avatarsContainer}>
        <Image source={{ uri: user1.image }} style={styles.avatar} />
        <Image source={{ uri: user2.image }} style={styles.avatar} />
      </View>

      <TouchableOpacity 
        style={styles.primaryButton} 
        onPress={() => {
          navigation.goBack(); // Close the modal first
          navigation.navigate('Chat', { user: user2 }); // Then navigate to chat
        }}
      >
        <Text style={styles.primaryButtonText}>Send a Message</Text>
      </TouchableOpacity>

      {/* THIS IS THE CORRECTED PART */}
      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => navigation.goBack()} // We just need a simple goBack() here.
      >
        <Text style={styles.secondaryButtonText}>Keep Swiping</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  avatarsContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginHorizontal: 10,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MatchScreen;
