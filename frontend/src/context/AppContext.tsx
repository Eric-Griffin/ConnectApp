import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext({
  likedEvents: [],
  matches: [],
  addLikedEvent: (event) => {},
  removeLikedEvent: (eventId) => {},
  // The addMatch function now accepts an eventId
  addMatch: (person, eventId, navigation) => {},
});

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [likedEvents, setLikedEvents] = useState([]);
  const [matches, setMatches] = useState([]);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: '60d5ecb4b392d326a0f1b9a1', eventId }),
      });
    } catch (error) {
      console.error('Failed to unlike event:', error);
    }
  };

  // THIS IS THE CORRECTED FUNCTION
  const addMatch = (person, eventId, navigation) => {
    // We create a new match object that includes the eventId
    const newMatch = { ...person, eventId: eventId };

    // We check for duplicates based on both the person's ID and the event ID
    if (!matches.find(m => m._id === person._id && m.eventId === eventId)) {
      setMatches(prevMatches => [...prevMatches, newMatch]);
    }
    navigation.navigate('Match', { user2: person });
  };

  const value = {
    likedEvents,
    matches,
    addLikedEvent,
    removeLikedEvent,
    addMatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
