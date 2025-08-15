import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';

// 1. Import our custom useApp hook
import { useApp } from '../context/AppContext';

function MyEventsScreen({ navigation }) {
  // 2. "Tune in" to the context to get the data and functions
  const { likedEvents, removeLikedEvent } = useApp();

  const handleUnlikeEvent = (event) => {
    Alert.alert(
      "Unlike Event",
      `Are you sure you want to remove "${event.name}" from your events?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Yes, Unlike", 
          onPress: () => removeLikedEvent(event._id),
          style: "destructive"
        }
      ]
    );
  };

  const renderEventCard = ({ item: event }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => navigation.navigate('PeopleDeck', { eventId: event._id })}
      onLongPress={() => handleUnlikeEvent(event)}
    >
      <Image source={{ uri: event.coverImageURL }} style={styles.eventImage} />
      <View style={styles.eventTextContainer}>
        <Text style={styles.eventName} numberOfLines={1}>{event.name}</Text>
        <Text style={styles.eventVenue} numberOfLines={1}>{event.venue}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Events</Text>
      </View>

      {likedEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't liked any events yet.</Text>
          <Text style={styles.emptySubtext}>Swipe right on events in the Discover tab!</Text>
        </View>
      ) : (
        <FlatList
          data={likedEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 8,
    textAlign: 'center',
  },
  listContainer: {
    padding: 10,
  },
  eventCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  eventTextContainer: {
    padding: 10,
  },
  eventName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  eventVenue: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
});

export default MyEventsScreen;
