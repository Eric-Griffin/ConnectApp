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

const ProfileRow = ({ label, value, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <View style={styles.rowValueContainer}>
      <Text style={styles.rowValue}>{value}</Text>
      <Text style={styles.rowArrow}>›</Text>
    </View>
  </TouchableOpacity>
);

const ProfileSection = ({ title, children }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate('Photos', { isEditMode: true })}>
            <Image
              source={{ uri: user.photos?.[0] || 'https://placehold.co/200x200/007AFF/FFFFFF?text=You' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.location}>Bengaluru, India</Text>
        </View>

        <ProfileSection title="My Basics">
          <ProfileRow label="Name" value={user.name} onPress={() => navigation.navigate('Name', { isEditMode: true })} />
          <ProfileRow label="Birthday" value={user.birthday} onPress={() => navigation.navigate('Name', { isEditMode: true })} />
          <ProfileRow label="Gender" value={user.gender} onPress={() => navigation.navigate('Gender', { isEditMode: true })} />
        </ProfileSection>

        <ProfileSection title="My Photos">
          <TouchableOpacity onPress={() => navigation.navigate('Photos', { isEditMode: true })}>
            <View style={styles.photoGrid}>
              {user.photos?.map((photo, index) => (
                <Image key={index} source={{ uri: photo }} style={styles.photo} />
              ))}
            </View>
          </TouchableOpacity>
        </ProfileSection>

        <ProfileSection title="My Interests">
          <TouchableOpacity onPress={() => navigation.navigate('Interests', { isEditMode: true })}>
            <View style={styles.tagContainer}>
              {user.interestTags?.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        </ProfileSection>

        <ProfileSection title="My Habits">
          <TouchableOpacity onPress={() => navigation.navigate('Habits', { isEditMode: true })}>
            <Text style={styles.sectionText}>Drinking: {user.habits?.drinking}</Text>
            <Text style={styles.sectionText}>Smoking: {user.habits?.smoking}</Text>
            <Text style={styles.sectionText}>Workout: {user.habits?.workout}</Text>
          </TouchableOpacity>
        </ProfileSection>

        <ProfileSection title="My Prompts">
          <TouchableOpacity onPress={() => navigation.navigate('Prompts', { isEditMode: true })}>
            {user.prompts?.map((prompt, index) => (
              <View key={index} style={styles.promptContainer}>
                <Text style={styles.promptQuestion}>{prompt.question}</Text>
                <Text style={styles.promptAnswer}>{prompt.answer}</Text>
              </View>
            ))}
          </TouchableOpacity>
        </ProfileSection>

        <ProfileSection title="My Phone Number">
          <ProfileRow label="Phone Number" value={user.phoneNumber} onPress={() => navigation.navigate('PhoneNumber', { isEditMode: true })} />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  sectionContent: {},
  sectionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  rowLabel: {
    fontSize: 16,
    color: '#333',
  },
  rowValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowValue: {
    fontSize: 16,
    color: '#8E8E93',
    marginRight: 10,
  },
  rowArrow: {
    fontSize: 20,
    color: '#C7C7CC',
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
