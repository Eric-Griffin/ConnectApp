import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext({
  user: null,
  likedEvents: [],
  matches: [],
  fetchUser: async () => {},
  updateUser: async (data) => {},
  addLikedEvent: (event) => {},
  removeLikedEvent: (eventId) => {},
  addMatch: (person, eventId, navigation) => {},
  setAuthToken: (token) => {},
});

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [likedEvents, setLikedEvents] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (authToken) {
      fetchUser();
    }
  }, [authToken]);

  const fetchUser = async () => {
    if (!authToken) return;
    try {
      const response = await fetch('http://10.0.2.2:5001/api/users/me', {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  const updateUser = async (updatedData) => {
    if (!authToken) return;
    try {
      const response = await fetch('http://10.0.2.2:5001/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const addLikedEvent = (event) => {
    if (!likedEvents.find(e => e._id === event._id)) {
      setLikedEvents(prevEvents => [...prevEvents, event]);
    }
  };

  const removeLikedEvent = async (eventId) => {
    setLikedEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
    try {
      await fetch('http://10.0.2.2:5001/api/swipes/event', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify({ userId: user._id, eventId }),
      });
    } catch (error) {
      console.error('Failed to unlike event:', error);
    }
  };

  const addMatch = (person, eventId, navigation) => {
    const newMatch = { ...person, eventId: eventId };
    if (!matches.find(m => m._id === person._id && m.eventId === eventId)) {
      setMatches(prevMatches => [...prevMatches, newMatch]);
    }
    navigation.navigate('Match', { user2: person });
  };

  const value = {
    user,
    likedEvents,
    matches,
    fetchUser,
    updateUser,
    addLikedEvent,
    removeLikedEvent,
    addMatch,
    setAuthToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
