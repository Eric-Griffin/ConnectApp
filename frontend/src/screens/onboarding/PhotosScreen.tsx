import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { useOnboarding } from '../../context/OnboardingContext';
import { theme } from '../../theme';
import * as ImagePicker from 'expo-image-picker';

const PhotoSlot = ({ image, onAdd, onRemove }) => (
  <TouchableOpacity style={styles.slot} onPress={image ? onRemove : onAdd}>
    {image ? (
      <Image source={{ uri: image }} style={styles.image} />
    ) : (
      <Text style={styles.plusIcon}>+</Text>
    )}
  </TouchableOpacity>
);

const PhotosScreen = ({ navigation }: any) => {
  const route = useRoute();
  const { isEditMode } = route.params || {};
  const { user, updateUser } = useApp();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (isEditMode && user) {
      setPhotos(user.photos || []);
    } else if (onboardingData) {
      setPhotos(onboardingData.photos || []);
    }
  }, [isEditMode, user, onboardingData]);

  const handleAddPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const handleSave = async () => {
    if (isEditMode) {
      await updateUser({ photos });
      navigation.goBack();
    } else {
      updateOnboardingData({ photos });
      navigation.navigate('Notifications');
    }
  };

  const isNextDisabled = photos.length < 1;

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
        <Text style={styles.title}>{isEditMode ? 'Edit Your Photos' : 'Time to put a face to the name'}</Text>
        <Text style={styles.subtitle}>Add at least 1 photo to continue.</Text>

        <View style={styles.photoGrid}>
          {[...Array(6)].map((_, index) => (
            <PhotoSlot
              key={index}
              image={photos[index]}
              onAdd={handleAddPhoto}
              onRemove={() => handleRemovePhoto(index)}
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
          onPress={handleSave}>
          <Text style={styles.primaryButtonText}>{isEditMode ? 'Save' : 'Continue'}</Text>
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
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
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
