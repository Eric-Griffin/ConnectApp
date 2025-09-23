import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileSection = ({ title, children, onPress }) => (
  <View style={styles.sectionContainer}>
    <TouchableOpacity onPress={onPress} style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.editButton}>Edit</Text>
    </TouchableOpacity>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

function ProfileScreen({ navigation }) {
  const { user, setAuthToken } = useApp();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('authToken');
    setAuthToken(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user.photos?.[0] || 'https://placehold.co/200x200/007AFF/FFFFFF?text=You' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.location}>Bengaluru, India</Text>
        </View>

        <ProfileSection title="My Basics" onPress={() => navigation.navigate('Name', { isEditMode: true })}>
          <Text style={styles.sectionText}>Name: {user.name}</Text>
          <Text style={styles.sectionText}>Birthday: {user.birthday}</Text>
          <Text style={styles.sectionText}>Gender: {user.gender}</Text>
        </ProfileSection>

        <ProfileSection title="My Photos" onPress={() => navigation.navigate('Photos', { isEditMode: true })}>
          <View style={styles.photoGrid}>
            {user.photos?.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.photo} />
            ))}
          </View>
        </ProfileSection>

        <ProfileSection title="My Interests" onPress={() => navigation.navigate('Interests', { isEditMode: true })}>
          <View style={styles.tagContainer}>
            {user.interestTags?.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </ProfileSection>

        <ProfileSection title="My Habits" onPress={() => navigation.navigate('Habits', { isEditMode: true })}>
          <Text style={styles.sectionText}>Drinking: {user.habits?.drinking}</Text>
          <Text style={styles.sectionText}>Smoking: {user.habits?.smoking}</Text>
          <Text style={styles.sectionText}>Workout: {user.habits?.workout}</Text>
        </ProfileSection>

        <ProfileSection title="My Prompts" onPress={() => navigation.navigate('Prompts', { isEditMode: true })}>
          {user.prompts?.map((prompt, index) => (
            <View key={index} style={styles.promptContainer}>
              <Text style={styles.promptQuestion}>{prompt.question}</Text>
              <Text style={styles.promptAnswer}>{prompt.answer}</Text>
            </View>
          ))}
        </ProfileSection>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
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
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  editButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  sectionContent: {},
  sectionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  tagText: {
    color: '#333',
  },
  promptContainer: {
    marginBottom: 10,
  },
  promptQuestion: {
    fontWeight: 'bold',
    color: '#555',
  },
  promptAnswer: {
    color: '#333',
  },
  signOutButton: {
    margin: 20,
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
