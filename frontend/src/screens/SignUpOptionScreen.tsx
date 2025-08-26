import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AppleLogo = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M17.5029 12.0336C17.5029 10.1363 18.2132 8.73356 19.5539 7.8257C18.8285 6.81282 17.7121 6.22641 16.4865 6.18376C15.176 6.09846 13.8806 6.94138 13.2052 6.94138C12.5298 6.94138 11.0242 6.09846 9.77391 6.24151C8.37345 6.38465 7.0179 7.22757 6.24758 8.35933C4.52151 10.8799 5.30693 14.5901 6.84238 16.8163C7.6127 17.948 8.62399 19.0371 9.98956 19.0797C11.2999 19.1224 11.8351 18.2795 13.2052 18.2795C14.5753 18.2795 15.0655 19.1224 16.4414 19.0646C17.892 19.0068 18.6623 17.8845 19.3978 16.7417C20.0883 15.6837 20.4136 14.7332 20.4435 14.6754C20.4136 14.6603 17.5029 13.5712 17.5029 12.0336Z" fill="#000000"/>
    <Path d="M15.1457 4.83691C15.7909 4.02845 16.2261 2.9967 16.0859 2C15.0447 2.11294 14.0485 2.7296 13.3882 3.52296C12.788 4.25897 12.2928 5.33338 12.448 6.32244C13.5543 6.42028 14.4855 5.66047 15.1457 4.83691Z" fill="#000000"/>
  </Svg>
);

const SocialButton = ({ icon, isApple = false }: { icon: string, isApple?: boolean }) => (
  <TouchableOpacity style={styles.socialButton}>
    {isApple ? <AppleLogo /> : <Text style={styles.socialIcon}>{icon}</Text>}
  </TouchableOpacity>
);

const SignUpOptionsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={{width: 20}} />
      </View>

      <View style={styles.content}>
        <View style={styles.logoPlaceholder} />

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Sign up to continue</Text>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('PhoneNumber')}
          >
            <Text style={styles.primaryButtonText}>Use phone number</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.separatorText}>or sign up with</Text>

        <View style={styles.socialContainer}>
          <SocialButton icon="f" />
          <SocialButton icon="G" />
          <SocialButton icon="" isApple={true} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          <Text>Terms of use</Text> & <Text>Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    fontSize: 30,
    color: '#000000',
    fontFamily: 'Sk-Modernist-Regular',
  },
  headerTitle: {
    fontSize: 18,
    color: '#8E8E93',
    fontFamily: 'Sk-Modernist-Regular',
    lineHeight: 24, // Added lineHeight
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#D0A8FF',
    marginBottom: 40,
  },
  box: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  boxTitle: {
    fontSize: 18,
    fontFamily: 'Sk-Modernist-Bold',
    marginBottom: 20,
    lineHeight: 24, // Added lineHeight
  },
  primaryButton: {
    backgroundColor: '#A8D1E7',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Bold',
    lineHeight: 22, // Added lineHeight
  },
  separatorText: {
    color: '#8E8E93',
    marginVertical: 24,
    fontFamily: 'Sk-Modernist-Regular',
    lineHeight: 20, // Added lineHeight
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  socialIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
  },
  footerText: {
    color: '#8E8E93',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Sk-Modernist-Regular',
    lineHeight: 18, // Added lineHeight
  },
});

export default SignUpOptionsScreen;
