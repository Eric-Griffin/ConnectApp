import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';

// This is a component for a single photo slot in the grid
const PhotoSlot = ({ onAdd, image }: any) => (
  <TouchableOpacity style={styles.slot} onPress={onAdd}>
    {/* If there's an image, we'll show it. Otherwise, show a plus icon. */}
    {image ? (
      <Text>Image Placeholder</Text> // In a real app, this would be an <Image> component
    ) : (
      <Text style={styles.plusIcon}>+</Text>
    )}
  </TouchableOpacity>
);

const PhotosScreen = ({ navigation }: any) => {
  const { updateOnboardingData } = useOnboarding();
  // We use an array to keep track of the photos. For now, it just holds placeholders.
  const [photos, setPhotos] = useState<{ id: number }[]>([]);

  const handleAddPhoto = () => {
    if (photos.length < 6) {
      // In a real app, this would open the image library.
      // For now, we just add a placeholder to the array.
      setPhotos([...photos, { id: photos.length + 1 }]);
    }
  };

  const handleContinue = () => {
    // In a real app, you would upload the photos and get back URLs.
    // For now, we'll just use placeholders.
    const photoUrls = photos.map(p => `https://example.com/photo${p.id}.jpg`);
    updateOnboardingData({ photos: photoUrls });
    navigation.navigate('OnboardingNotifications');
  };

  const isNextDisabled = photos.length < 4;

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButtonCircle}>
            <Text style={styles.backButton}>‹</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Time to put a face to the name</Text>
        <Text style={styles.subtitle}>Add at least 4 photos to continue.</Text>
        
        <View style={styles.photoGrid}>
          {/* We create 6 slots and fill them based on the photos array */}
          {[...Array(6)].map((_, index) => (
            <PhotoSlot
              key={index}
              image={photos[index]}
              onAdd={handleAddPhoto}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.primaryButton, isNextDisabled && styles.disabledButton]}
          disabled={isNextDisabled}
          onPress={handleContinue}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
   header: {
    padding: 20,
    alignItems: 'flex-start',
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 24,
    color: '#000000',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 0,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Sk-Modernist-Bold',
    color: '#000000',
    marginBottom: 8,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#8E8E93',
    marginBottom: 30,
    lineHeight: 22,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slot: {
    width: '30%',
    aspectRatio: 1, // Creates a square
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  plusIcon: {
    fontSize: 40,
    color: '#AEAEB2',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  primaryButton: {
    backgroundColor: '#A8D1E7',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Bold',
  },
  disabledButton: {
    backgroundColor: '#DCEBFF',
  },
});

export default PhotosScreen;
