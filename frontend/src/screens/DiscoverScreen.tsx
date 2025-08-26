import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

import SwipeableCard from '../components/SwipeableCard';
import { useApp } from '../context/AppContext';
import CustomHeader from '../components/CustomHeader';

// 1. We define the "shape" of an Event object
type Event = {
  _id: string;
  name: string;
  venue: string;
  coverImageURL: string;
};

const EventCard = ({ card }: { card: Event }) => (
  <View style={styles.card}>
    <Image source={{ uri: card.coverImageURL }} style={styles.cardImage} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{card.name}</Text>
      <Text style={styles.cardSubtitle}>{card.venue}</Text>
    </View>
  </View>
);

const EmptyState = ({ title, subtitle }: any) => (
    <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{title}</Text>
        <Text style={styles.emptySubtext}>{subtitle}</Text>
    </View>
);

function DiscoverScreen() {
  const { addLikedEvent } = useApp();
  // 2. We tell useState the correct types for our state variables
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const handleSwipe = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handleSwipeRight = () => {
    addLikedEvent(events[currentIndex]);
    handleSwipe();
  };

  if (isLoading) {
    return (
        <View style={styles.container}>
            <CustomHeader />
            <View style={styles.emptyContainer}><ActivityIndicator size="large" color="#A8D1E7" /></View>
        </View>
    );
  }

  if (error) {
    return (
        <View style={styles.container}>
            <CustomHeader />
            <EmptyState title="Something went wrong" subtitle={error} />
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.deckContainer}>
        {currentIndex < events.length ? (
          events.slice(currentIndex).reverse().map((event) => (
            <SwipeableCard
              key={event._id}
              onSwipeLeft={handleSwipe}
              onSwipeRight={handleSwipeRight}
            >
              <EventCard card={event} />
            </SwipeableCard>
          ))
        ) : (
          <EmptyState title="No more events" subtitle="You've seen them all!" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  deckContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
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
    fontFamily: 'Sk-Modernist-Bold',
    color: '#FFFFFF',
    lineHeight: 30,
  },
  cardSubtitle: {
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#FFFFFF',
    marginTop: 4,
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 22,
    fontFamily: 'Sk-Modernist-Bold',
    color: '#2C2C2E',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#8E8E93',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default DiscoverScreen;
