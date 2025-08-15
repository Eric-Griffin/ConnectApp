import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Reusable component for menu items
const SettingsMenuItem = ({ text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuText}>{text}</Text>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

// Reusable component for section headers
const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings & Privacy</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView>
        <View style={styles.menuContainer}>
          <SectionHeader title="ACCOUNT" />
          <SettingsMenuItem text="Phone Number" onPress={() => {}} />
          <SettingsMenuItem text="Notifications" onPress={() => {}} />

          <SectionHeader title="SECURITY" />
          <SettingsMenuItem text="Privacy Policy" onPress={() => {}} />
          <SettingsMenuItem text="Terms of Service" onPress={() => {}} />

          <SectionHeader title="ABOUT" />
          <SettingsMenuItem text="Help Center" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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
  menuContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 10,
    marginTop: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 2, // Tighter spacing for list items
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  menuArrow: {
    fontSize: 20,
    color: '#C7C7CC',
  },
});

export default SettingsScreen;
