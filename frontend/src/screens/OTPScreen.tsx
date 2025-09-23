import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { theme } from '../theme';

const KeypadButton = ({ value, onPress }: any) => (
  <TouchableOpacity style={styles.keypadButton} onPress={() => onPress(value)}>
    <Text style={styles.keypadButtonText}>{value}</Text>
  </TouchableOpacity>
);

const OTPBox = ({ digit }: any) => (
  <View style={[styles.otpBox, digit ? styles.otpBoxFilled : {}]}>
    <Text style={styles.otpText}>{digit}</Text>
  </View>
);

const OTPScreen = ({ route, navigation }: any) => {
  const { flow } = route.params || {};
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(90);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleKeyPress = (value: string) => {
    if (otp.length < 4) {
      setOtp(otp + value);
    }
  };

  const handleDelete = () => {
    setOtp(otp.slice(0, -1));
  };

  const handleSendAgain = () => {
    if (timer === 0) {
      setTimer(90);
    }
  };

  useEffect(() => {
    if (otp.length === 4) {
      if (flow === 'signIn') {
        navigation.navigate('MainApp');
      } else {
        navigation.navigate('OnboardingProfileDetails');
      }
    }
  }, [otp, navigation, flow]);

  const formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`;

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
        <Text style={styles.timerText}>{formattedTime}</Text>
        <Text style={styles.title}>
          Type the verification code we've sent you
        </Text>

        <View style={styles.otpContainer}>
          <OTPBox digit={otp[0]} />
          <OTPBox digit={otp[1]} />
          <OTPBox digit={otp[2]} />
          <OTPBox digit={otp[3]} />
        </View>
      </View>

      <View style={styles.keypadContainer}>
        <View style={styles.keypadRow}>
          <KeypadButton value="1" onPress={handleKeyPress} />
          <KeypadButton value="2" onPress={handleKeyPress} />
          <KeypadButton value="3" onPress={handleKeyPress} />
        </View>
        <View style={styles.keypadRow}>
          <KeypadButton value="4" onPress={handleKeyPress} />
          <KeypadButton value="5" onPress={handleKeyPress} />
          <KeypadButton value="6" onPress={handleKeyPress} />
        </View>
        <View style={styles.keypadRow}>
          <KeypadButton value="7" onPress={handleKeyPress} />
          <KeypadButton value="8" onPress={handleKeyPress} />
          <KeypadButton value="9" onPress={handleKeyPress} />
        </View>
        <View style={styles.keypadRow}>
          <TouchableOpacity
            style={styles.sendAgainButton}
            onPress={handleSendAgain}
            disabled={timer > 0}>
            <Text
              style={[
                styles.sendAgainText,
                timer > 0 && styles.sendAgainDisabled,
              ]}>
              Send again
            </Text>
          </TouchableOpacity>
          <KeypadButton value="0" onPress={handleKeyPress} />
          <TouchableOpacity style={styles.keypadButton} onPress={handleDelete}>
            <Text style={styles.keypadButtonText}>⌫</Text>
          </TouchableOpacity>
        </View>
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
    fontFamily: theme.fonts.regular,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  timerText: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: theme.colors.black,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
    textAlign: 'center',
    maxWidth: '70%',
    lineHeight: 22,
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
  },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  otpBoxFilled: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  otpText: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.black,
  },
  keypadContainer: {
    padding: 20,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  keypadButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadButtonText: {
    fontSize: 28,
    fontFamily: theme.fonts.regular,
  },
  sendAgainButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendAgainText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
  },
  sendAgainDisabled: {
    color: theme.colors.gray,
  },
});

export default OTPScreen;
