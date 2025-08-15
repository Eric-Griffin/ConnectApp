import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

// This is a reusable component for the list items
const ProfileMenuItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <Text style={styles.menuText}>{text}</Text>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

function ProfileScreen({ navigation }) {
  // This function will handle signing out
  const handleSignOut = () => {
    // We reset the entire navigation stack back to the Welcome screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://placehold.co/200x200/007AFF/FFFFFF?text=You' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Eric</Text>
        <Text style={styles.location}>Bengaluru, India</Text>
      </View>

      <View style={styles.menuContainer}>
        <ProfileMenuItem 
          icon="" 
          text="Edit Profile" 
          onPress={() => navigation.navigate('EditProfile')} 
        />
        <ProfileMenuItem 
          icon="" 
          text="Settings & Privacy" 
          onPress={() => navigation.navigate('Settings')} 
        />
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  location: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 4,
  },
  menuContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  menuArrow: {
    fontSize: 20,
    color: '#C7C7CC',
  },
  signOutButton: {
    margin: 20,
    marginTop: 'auto', // Pushes the button to the bottom
    backgroundColor: '#FFEBEB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
