import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

import SwipeableCard from '../components/SwipeableCard';
import { useApp } from '../context/AppContext';

// 1. We define the "shape" of a Person object
type Person = {
  _id: string;
  name: string;
  age: number;
  bio: string;
  image: string;
};

const PersonCard = ({ card }: { card: Person }) => (
  <View style={styles.card}>
    <Image source={{ uri: card.image }} style={styles.cardImage} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{card.name}, {card.age}</Text>
      <Text style={styles.cardSubtitle} numberOfLines={1}>{card.bio}</Text>
    </View>
  </View>
);

const EmptyState = ({ title, subtitle }: any) => (
    <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{title}</Text>
        <Text style={styles.emptySubtext}>{subtitle}</Text>
    </View>
);

function PeopleDeckScreen({ navigation, route }: any) {
  const { addMatch } = useApp();
  const { eventId } = route.params;
  
  // 2. We tell useState the correct types for our state variables
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:5001/api/events/${eventId}/people`);
        if (!response.ok) throw new Error('Failed to fetch people');
        const data = await response.json();
        setPeople(data);
      } catch (e) {
        setError('Could not connect to the server.');
      } finally {
        setIsLoading(false);
      }
    };
    if (eventId) {
      fetchPeople();
    }
  }, [eventId]);

  const handleSwipe = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handleSwipeRight = () => {
    const person = people[currentIndex];
    setTimeout(() => {
      addMatch(person, eventId, navigation);
    }, 250);
    handleSwipe();
  };

  if (isLoading) {
    return <View style={styles.emptyContainer}><ActivityIndicator size="large" color="#A8D1E7" /></View>;
  }

  if (error) {
    return <EmptyState title="Something went wrong" subtitle={error} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back to Events</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.deckContainer}>
        {currentIndex < people.length ? (
          <SwipeableCard
            key={people[currentIndex]._id}
            onSwipeLeft={handleSwipe}
            onSwipeRight={handleSwipeRight}
          >
            <PersonCard card={people[currentIndex]} />
          </SwipeableCard>
        ) : (
          <EmptyState title="No one else yet" subtitle="You've seen them all!" />
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
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  backButton: {
    fontSize: 18,
    color: '#A8D1E7',
    fontFamily: 'Sk-Modernist-Bold',
  },
  card: {
    width: '95%',
    height: '95%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  },
  cardSubtitle: {
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Regular',
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

export default PeopleDeckScreen;
