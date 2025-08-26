import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// New component for the blue heart icon
const BlueHeartIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path 
            d="M12.0001 21.35L10.5501 20.03C5.40009 15.36 2.00009 12.28 2.00009 8.5C2.00009 5.42 4.42009 3 7.50009 3C9.24009 3 10.9101 3.81 12.0001 5.09C13.0901 3.81 14.7601 3 16.5001 3C19.5801 3 22.0001 5.42 22.0001 8.5C22.0001 12.28 18.6001 15.36 13.4501 20.04L12.0001 21.35Z" 
            fill="#A8D1E7" // Using the app's theme blue
        />
    </Svg>
);

const MatchScreen = ({ route, navigation }: any) => {
  const { user2 } = route.params;
  const user1 = { 
    name: 'You', 
    image: 'https://picsum.photos/seed/user1/600/800' 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.photosContainer}>
          {/* Bottom Photo */}
          <View style={[styles.photoWrapper, styles.photoBottom]}>
            <Image source={{ uri: user1.image }} style={styles.photo} />
            <View style={styles.heartIcon}>
              <BlueHeartIcon />
            </View>
          </View>
          {/* Top Photo */}
          <View style={[styles.photoWrapper, styles.photoTop]}>
            <Image source={{ uri: user2.image }} style={styles.photo} />
            <View style={styles.heartIcon}>
              <BlueHeartIcon />
            </View>
          </View>
        </View>

        <Text style={styles.title}>It's a match, {user2.name}!</Text>
        <Text style={styles.subtitle}>Start a conversation now with each other</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => {
            navigation.goBack();
            navigation.navigate('Chat', { user: user2 });
          }}
        >
          <Text style={styles.primaryButtonText}>Say hello</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>Keep swiping</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  photosContainer: {
    width: 300,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  photoWrapper: {
    position: 'absolute',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  photo: {
    width: 180,
    height: 250,
    borderRadius: 20,
  },
  photoTop: {
    transform: [{ rotate: '10deg' }],
    zIndex: 2,
    right: 40,
    top: 50,
  },
  photoBottom: {
    transform: [{ rotate: '-10deg' }],
    zIndex: 1,
    left: 40,
    bottom: 50,
  },
  heartIcon: {
    position: 'absolute',
    bottom: -20,
    left: '50%',
    marginLeft: -25, // Half of width
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Sk-Modernist-Bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#A8D1E7',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Bold',
  },
  secondaryButton: {
    backgroundColor: '#F7F8FA',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Bold',
    // THIS IS THE FIX for the text being cut off
    lineHeight: 22,
  },
});

export default MatchScreen;
