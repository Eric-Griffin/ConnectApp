import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ActivityIndicator } from 'react-native';

// 1. Import our new custom SwipeableCard component
import SwipeableCard from '../components/SwipeableCard';
import { useApp } from '../context/AppContext';

// This is the UI for a single card. It's just a view, no logic.
const EventCard = ({ card }) => (
  <View style={styles.card}>
    <Image source={{ uri: card.coverImageURL }} style={styles.cardImage} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{card.name}</Text>
      <Text style={styles.cardSubtitle}>{card.venue}</Text>
    </View>
  </View>
);

const EmptyState = ({ title, subtitle }) => (
    <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{title}</Text>
        <Text style={styles.emptySubtext}>{subtitle}</Text>
    </View>
);

function DiscoverScreen() {
  const { addLikedEvent } = useApp();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // This state keeps track of the current active card index.
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5001/api/events/deck');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch (e) {
        setError('Could not connect to the server.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // This function is called when a swipe happens. It just moves to the next card.
  const handleSwipe = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handleSwipeRight = () => {
    addLikedEvent(events[currentIndex]);
    handleSwipe();
  };

  if (isLoading) {
    return <View style={styles.emptyContainer}><ActivityIndicator size="large" color="#007AFF" /></View>;
  }

  if (error) {
    return <EmptyState title="Something went wrong" subtitle={error} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.deckContainer}>
        {/* We check if there are any cards left to show */}
        {currentIndex < events.length ? (
          // We render the top card as interactive.
          <SwipeableCard
            key={events[currentIndex]._id}
            onSwipeLeft={handleSwipe}
            onSwipeRight={handleSwipeRight}
          >
            <EventCard card={events[currentIndex]} />
          </SwipeableCard>
        ) : (
          // If no cards are left, we show the empty state.
          <EmptyState title="No more events" subtitle="You've seen them all!" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  deckContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    height: '85%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  cardTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default DiscoverScreen;
