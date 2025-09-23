import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';

type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CustomHeader = () => {
  const navigation = useNavigation<HeaderNavigationProp>();

  return (
    <SafeAreaView style={styles.headerSafe}>
      <View style={styles.headerContainer}>
        <View style={styles.sideComponent} />
        <View style={styles.titleContainer}>
          <Text style={styles.appName}>Connect</Text>
        </View>
        <TouchableOpacity
          style={styles.sideComponent}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{
              uri: 'https://placehold.co/100x100/EFEFF4/2C2C2E?text=E',
            }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerSafe: {
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  appName: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  sideComponent: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomHeader;
