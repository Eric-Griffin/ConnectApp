import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';

function EditProfileScreen({ navigation }) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F8F8F8'}}>
        {/* Custom Header */}
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
            <TextInput style={styles.textInput} placeholder="Your Name" defaultValue="Eric" />
            <TextInput style={styles.textInput} placeholder="Your Age" keyboardType="number-pad" />
            <TextInput style={styles.textInput} placeholder="Your Height (cm)" keyboardType="number-pad" />

            <Text style={styles.sectionTitle}>Your Photos</Text>
            <View style={styles.photoGrid}>
                {[...Array(6)].map((_, index) => (
                    <TouchableOpacity key={index} style={styles.photoPlaceholder}>
                        <Text style={styles.plusIcon}>+</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionTitle}>About You</Text>
            <TextInput 
            style={[styles.textInput, styles.bioInput]} 
            placeholder="Write a short bio..." 
            multiline 
            />

            <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => navigation.goBack()} // Just goes back after saving
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
