import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

// This component now receives the `navigation` prop from its own Stack Navigator
function MyEventsScreen({ likedEvents, navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Events</Text>
      </View>

      {likedEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't liked any events yet.</Text>
          <Text style={styles.emptySubtext}>Swipe right on events in the Discover tab!</Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {likedEvents.map((event: any) => (
            <TouchableOpacity 
              key={event.id} 
              style={styles.eventCard}
              // This now navigates within the MyEventsStackNavigator
              onPress={() => navigation.navigate('PeopleDeck')}
            >
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={styles.eventTextContainer}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventVenue}>{event.venue}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
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
    paddingTop: 150,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 8,
  },
  listContainer: {
    padding: 20,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  eventTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  eventVenue: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
});

export default MyEventsScreen;
