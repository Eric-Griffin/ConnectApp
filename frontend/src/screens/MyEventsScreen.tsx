import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';

import { useApp } from '../context/AppContext';
import CustomHeader from '../components/CustomHeader';

function MyEventsScreen({ navigation }: any) {
  const { likedEvents, removeLikedEvent } = useApp();

  const handleUnlikeEvent = (event: any) => {
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

  const renderEventCard = ({ item: event }: { item: any }) => (
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
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      
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
          ListHeaderComponent={() => <Text style={styles.title}>My Events</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Sk-Modernist-Bold',
    // THIS IS THE FIX
    color: '#A8D1E7', 
    paddingHorizontal: 20,
    marginBottom: 10,
    lineHeight: 40,
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
  listContainer: {
    paddingHorizontal: 10,
  },
  eventCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    fontFamily: 'Sk-Modernist-Bold',
    color: '#2C2C2E',
  },
  eventVenue: {
    fontSize: 12,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#8E8E93',
    marginTop: 4,
  },
});

export default MyEventsScreen;
