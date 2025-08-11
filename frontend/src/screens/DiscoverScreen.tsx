import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import Swiper from 'react-native-deck-swiper';

// Sample data (no change here)
const events = [
  {
    id: 1,
    name: 'Anuv Jain - Live',
    venue: 'Jayamahal Palace Hotel',
    date: 'Sat, Aug 16',
    image: 'https://placehold.co/600x800/007AFF/FFFFFF?text=Event+1',
  },
  {
    id: 2,
    name: 'Bengaluru Comedy Festival',
    venue: 'That Comedy Club',
    date: 'Fri, Aug 22',
    image: 'https://placehold.co/600x800/34C759/FFFFFF?text=Event+2',
  },
  {
    id: 3,
    name: 'Indie Music Showcase',
    venue: 'Fandom at Gilly\'s Redefined',
    date: 'Sun, Aug 24',
    image: 'https://placehold.co/600x800/FF9500/FFFFFF?text=Event+3',
  },
];

const EventCard = ({ card }: any) => (
  <View style={styles.card}>
    <Image source={{ uri: card.image }} style={styles.cardImage} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{card.name}</Text>
      <Text style={styles.cardSubtitle}>{card.venue} - {card.date}</Text>
    </View>
  </View>
);

// This component now accepts the `onSwipeRight` function as a prop
function DiscoverScreen({ onSwipeRight }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Swiper
        cards={events}
        renderCard={(card) => <EventCard card={card} />}
        // When a card is swiped right, we call the onSwipeRight function
        // and pass the entire event object (the card) to it.
        onSwipedRight={(cardIndex) => onSwipeRight(events[cardIndex])}
        onSwipedAll={() => console.log('No more events')}
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

export default DiscoverScreen;
