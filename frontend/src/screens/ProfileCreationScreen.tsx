import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

// This screen now accepts the `navigation` object
function ProfileCreationScreen({ navigation }: any) {
    return (
      <ScrollView 
        style={styles.fullScreen} 
        contentContainerStyle={styles.onboardingContent}
        keyboardShouldPersistTaps="handled" 
      >
        <Text style={styles.onboardingTitle}>Create your profile</Text>
        
        <Text style={styles.sectionTitle}>The Basics</Text>
        <TextInput style={styles.textInput} placeholder="Your Name" />
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

        {/* This will eventually navigate to the main app, but for now it goes back to Welcome */}
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => navigation.navigate('MainApp')} 
        >
            <Text style={styles.primaryButtonText}>Finish</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
            <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    onboardingContent: { 
        flexGrow: 1, 
        justifyContent: 'center', 
        padding: 20 
    },
    onboardingTitle: { 
        fontSize: 34, 
        fontWeight: 'bold', 
        color: '#1A1A1A', 
        marginBottom: 20 
    },
    sectionTitle: { 
        fontSize: 22, 
        fontWeight: '600', 
        color: '#1A1A1A', 
        marginTop: 30, 
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
    backButton: { 
        marginTop: 10, 
        alignItems: 'center', 
        padding: 10 
    },
    secondaryButtonText: { 
        color: '#007AFF', 
        fontSize: 18, 
        fontWeight: '600' 
    },
});

export default ProfileCreationScreen;
