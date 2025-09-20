import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

const OnboardingContext = createContext({
  onboardingData: {},
  updateOnboardingData: (data) => {},
  submitOnboardingData: async () => {},
});

export const useOnboarding = () => {
  return useContext(OnboardingContext);
};

export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({});

  const updateOnboardingData = (data) => {
    setOnboardingData(prevData => ({ ...prevData, ...data }));
  };

  const submitOnboardingData = async () => {
    const { user, token, ...profileData } = onboardingData;
    if (!user || !token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      const response = await fetch(`http://10.0.2.2:5001/api/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to the server');
    }
  };

  const value = {
    onboardingData,
    updateOnboardingData,
    submitOnboardingData,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};
