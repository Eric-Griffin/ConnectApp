import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import { theme } from '../../theme';

const PhotoSlot = ({ onAdd, image }: any) => (
  <TouchableOpacity style={styles.slot} onPress={onAdd}>
    {image ? (
      <Text>Image Placeholder</Text>
    ) : (
      <Text style={styles.plusIcon}>+</Text>
    )}
  </TouchableOpacity>
);

const PhotosScreen = ({ navigation }: any) => {
  const { updateOnboardingData } = useOnboarding();
  const [photos, setPhotos] = useState<{ id: number }[]>([]);

  const handleAddPhoto = () => {
    if (photos.length < 6) {
      setPhotos([...photos, { id: photos.length + 1 }]);
    }
  };

  const handleContinue = () => {
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
          style={[
            styles.primaryButton,
            isNextDisabled && styles.disabledButton,
          ]}
          disabled={isNextDisabled}
          onPress={handleContinue}>
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    padding: 20,
    alignItems: 'flex-start',
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 24,
    color: theme.colors.black,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 0,
  },
  title: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: theme.colors.black,
    marginBottom: 8,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
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
    aspectRatio: 1,
    backgroundColor: theme.colors.lightGray,
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
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fonts.bold,
  },
  disabledButton: {
    backgroundColor: theme.colors.primary,
    opacity: 0.5,
  },
});

export default PhotosScreen;
