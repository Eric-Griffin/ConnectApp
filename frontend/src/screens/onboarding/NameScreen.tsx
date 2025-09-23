import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
const NameScreen = ({ navigation }: any) => {
  const route = useRoute();
  const { isEditMode } = route.params || {};
  const { user, updateUser } = useApp();

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');

  const monthInputRef = useRef<TextInput>(null);
  const yearInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isEditMode && user) {
      setName(user.name || '');
      setBirthday(user.birthday || '');
      setGender(user.gender || '');
    }
  }, [isEditMode, user]);

  const handleSave = async () => {
    if (isEditMode) {
      await updateUser({ name, birthday, gender });
      navigation.goBack();
    } else {
      // This part is for the onboarding flow, which is not part of this task
      navigation.navigate('Email');
    }
  };

  const isNextDisabled = !name || !birthday || !gender;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexOne}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{isEditMode ? 'Edit Your Basics' : 'What\'s your name?'}</Text>
          
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Birthday</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={birthday}
            onChangeText={setBirthday}
          />

          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your gender"
            value={gender}
            onChangeText={setGender}
          />
        </View>

        <View style={styles.footer}>
          <View /> 
          <TouchableOpacity
            style={[styles.nextButton, isNextDisabled && styles.disabledButton]}
            disabled={isNextDisabled}
            onPress={handleSave}
          >
            <Text style={styles.nextButtonText}>{isEditMode ? 'Save' : '→'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  flexOne: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C2C2E',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8A8A8E',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#EFEFF4',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    marginBottom: 24,
    color: '#2C2C2E',
  },
  footer: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#AEAEB2',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 30,
  },
});

export default NameScreen;
