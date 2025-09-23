import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { useApp } from '../context/AppContext';

function EditProfileScreen({ navigation }) {
    const { user, updateUser } = useApp();
    const [formData, setFormData] = useState({
        name: '',
        birthday: '',
        gender: '',
        interestTags: [],
        prompts: [{ question: '', answer: '' }, { question: '', answer: '' }],
        photos: [],
        habits: { drinking: '', smoking: '', workout: '' },
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                birthday: user.birthday || '',
                gender: user.gender || '',
                interestTags: user.interestTags || [],
                prompts: user.prompts?.length ? user.prompts : [{ question: '', answer: '' }, { question: '', answer: '' }],
                photos: user.photos || [],
                habits: user.habits || { drinking: '', smoking: '', workout: '' },
            });
        }
    }, [user]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleHabitChange = (habit, value) => {
        setFormData(prev => ({
            ...prev,
            habits: { ...prev.habits, [habit]: value },
        }));
    };

    const handlePromptChange = (index, type, value) => {
        const newPrompts = [...formData.prompts];
        newPrompts[index][type] = value;
        setFormData(prev => ({ ...prev, prompts: newPrompts }));
    };

    const handleSaveChanges = async () => {
        await updateUser(formData);
        Alert.alert('Profile Updated', 'Your changes have been saved.');
        navigation.goBack();
    };

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F8F8F8'}}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <View style={{ width: 30 }} /> 
        </View>

        <ScrollView 
            style={styles.fullScreen} 
            contentContainerStyle={styles.onboardingContent}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.sectionTitle}>The Basics</Text>
            <TextInput style={styles.textInput} placeholder="Your Name" value={formData.name} onChangeText={text => handleInputChange('name', text)} />
            <TextInput style={styles.textInput} placeholder="Birthday (YYYY-MM-DD)" value={formData.birthday} onChangeText={text => handleInputChange('birthday', text)} />
            <TextInput style={styles.textInput} placeholder="Gender" value={formData.gender} onChangeText={text => handleInputChange('gender', text)} />

            <Text style={styles.sectionTitle}>Your Photos</Text>
            <View style={styles.photoGrid}>
                {formData.photos.map((photo, index) => (
                    <View key={index} style={styles.photoPlaceholder}>
                        <Image source={{ uri: photo }} style={styles.photo} />
                    </View>
                ))}
                {[...Array(6 - formData.photos.length)].map((_, index) => (
                    <TouchableOpacity key={index} style={styles.photoPlaceholder}>
                        <Text style={styles.plusIcon}>+</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionTitle}>Interests</Text>
            <TextInput style={styles.textInput} placeholder="Add interests (comma separated)" value={formData.interestTags.join(', ')} onChangeText={text => handleInputChange('interestTags', text.split(',').map(s => s.trim()))} />

            <Text style={styles.sectionTitle}>Habits</Text>
            <TextInput style={styles.textInput} placeholder="Drinking" value={formData.habits.drinking} onChangeText={text => handleHabitChange('drinking', text)} />
            <TextInput style={styles.textInput} placeholder="Smoking" value={formData.habits.smoking} onChangeText={text => handleHabitChange('smoking', text)} />
            <TextInput style={styles.textInput} placeholder="Workout" value={formData.habits.workout} onChangeText={text => handleHabitChange('workout', text)} />

            <Text style={styles.sectionTitle}>Prompts</Text>
            {formData.prompts.map((prompt, index) => (
                <View key={index}>
                    <TextInput style={styles.textInput} placeholder={`Question ${index + 1}`} value={prompt.question} onChangeText={text => handlePromptChange(index, 'question', text)} />
                    <TextInput style={[styles.textInput, styles.bioInput]} placeholder={`Answer ${index + 1}`} value={prompt.answer} onChangeText={text => handlePromptChange(index, 'answer', text)} multiline />
                </View>
            ))}

            <TouchableOpacity 
                style={styles.primaryButton}
                onPress={handleSaveChanges}
            >
                <Text style={styles.primaryButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        fontSize: 24,
        color: '#007AFF',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    onboardingContent: { 
        padding: 20 
    },
    sectionTitle: { 
        fontSize: 22, 
        fontWeight: '600', 
        color: '#1A1A1A', 
        marginTop: 10, 
        marginBottom: 15 
    },
    textInput: { 
        backgroundColor: '#FFFFFF', 
        padding: 15, 
        borderRadius: 10, 
        fontSize: 16, 
        marginBottom: 10, 
        borderWidth: 1, 
        borderColor: '#E0E0E0' 
    },
    bioInput: { 
        height: 100, 
        textAlignVertical: 'top' 
    },
    photoGrid: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between' 
    },
    photoPlaceholder: { 
        width: '30%', 
        aspectRatio: 1, 
        backgroundColor: '#EFEFEF', 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 10 
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    plusIcon: { 
        fontSize: 40, 
        color: '#C0C0C0' 
    },
    primaryButton: { 
        backgroundColor: '#007AFF', 
        padding: 15, 
        borderRadius: 12, 
        alignItems: 'center', 
        marginTop: 20,
        marginBottom: 10 
    },
    primaryButtonText: { 
        color: '#FFFFFF', 
        fontSize: 18, 
        fontWeight: '600' 
    },
});

export default EditProfileScreen;
