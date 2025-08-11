import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';

// Sample data for people interested in an event.
const people = [
  {
    id: 1,
    name: 'Aisha',
    age: 28,
    bio: 'Loves indie music and trying new food spots.',
    image: 'https://placehold.co/600x800/FF3B30/FFFFFF?text=Aisha',
  },
  {
    id: 2,
    name: 'Rohan',
    age: 31,
    bio: 'Stand-up comedy enthusiast. Always up for a laugh.',
    image: 'https://placehold.co/600x800/5856D6/FFFFFF?text=Rohan',
  },
  {
    id: 3,
    name: 'Priya',
    age: 26,
    bio: 'Concert-goer and weekend trekker.',
    image: 'https://placehold.co/600x800/FF9500/FFFFFF?text=Priya',
  },
];

const PersonCard = ({ card }: any) => (
  <View style={styles.card}>
    <Image source={{ uri: card.image }} style={styles.cardImage} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{card.name}, {card.age}</Text>
      <Text style={styles.cardSubtitle}>{card.bio}</Text>
    </View>
  </View>
);

// This component now receives the `onMatch` function directly from App.tsx
function PeopleDeckScreen({ navigation, onMatch }: any) {

  const handleSwipeRight = (cardIndex: any) => {
  const person = people[cardIndex];
  // We wrap the navigation call in a timeout.
  // This gives the card swipe animation time to finish before we navigate.
  setTimeout(() => {
    onMatch(person, navigation);
    }, 250); // A 250ms delay is usually enough.
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back to Events</Text>
        </TouchableOpacity>
      </View>
      <Swiper
        cards={people}
        renderCard={(card) => <PersonCard card={card} />}
        onSwipedRight={handleSwipeRight}
        onSwipedAll={() => navigation.goBack()}
        cardIndex={0}
        backgroundColor={'#F8F8F8'}
        stackSize={3}
        stackSeparation={15}
        animateCardOpacity
        verticalSwipe={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
  },
  card: {
    flex: 0.85,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    flex: 1,
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
});

export default PeopleDeckScreen;
