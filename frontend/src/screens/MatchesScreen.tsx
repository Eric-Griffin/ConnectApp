import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';

import { useApp } from '../context/AppContext';

const EventMatchBanner = ({ event, matchesForEvent, onPress }) => {
  const displayedMatches = matchesForEvent.slice(0, 3);
  const remainingMatches = matchesForEvent.length - displayedMatches.length;

  return (
    <TouchableOpacity style={styles.bannerCard} onPress={onPress}>
      <Image source={{ uri: event.coverImageURL }} style={styles.bannerImage} />
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerTitle}>{event.name}</Text>
        <Text style={styles.bannerSubtitle}>{matchesForEvent.length} Match{matchesForEvent.length > 1 ? 'es' : ''}</Text>
      </View>
      <View style={styles.matchPfpContainer}>
        {displayedMatches.map((match, index) => (
          <Image 
            key={match._id} 
            source={{ uri: match.image }} 
            style={[styles.matchPfp, { marginLeft: index > 0 ? -15 : 0 }]}
          />
        ))}
        {remainingMatches > 0 && (
          <View style={[styles.matchPfp, styles.morePfp]}>
            <Text style={styles.morePfpText}>+{remainingMatches}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

function MatchesScreen({ navigation }) {
  const { matches, likedEvents } = useApp();

  // THIS IS THE CORRECTED LOGIC
  const groupedMatches = useMemo(() => {
    if (!matches || matches.length === 0) return [];

    // 1. Group all matches by their eventId
    const groups = matches.reduce((acc, match) => {
      const eventId = match.eventId; // We now correctly use the eventId from the match object
      if (!acc[eventId]) {
        acc[eventId] = [];
      }
      acc[eventId].push(match);
      return acc;
    }, {});

    // 2. Convert the groups into an array for the list
    return Object.keys(groups).map(eventId => {
      const eventDetails = likedEvents.find(e => e._id === eventId);
      return {
        eventId,
        event: eventDetails,
        matches: groups[eventId],
      };
    }).filter(group => group.event); // Make sure we found valid event details
  }, [matches, likedEvents]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Matches</Text>
      </View>

      {groupedMatches.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No matches yet.</Text>
          <Text style={styles.emptySubtext}>Keep swiping to find your concert buddy!</Text>
        </View>
      ) : (
        <FlatList
          data={groupedMatches}
          keyExtractor={(item) => item.eventId}
          renderItem={({ item }) => (
            <EventMatchBanner
              event={item.event}
              matchesForEvent={item.matches}
              onPress={() => navigation.navigate('EventMatches', { 
                eventName: item.event.name,
                matchesForEvent: item.matches 
              })}
            />
          )}
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
    borderBottomColor: '#E0E0E-0',
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
  },
  emptySubtext: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 8,
  },
  listContainer: {
    padding: 20,
  },
  bannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bannerTextContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 8,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 2,
  },
  matchPfpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  matchPfp: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  morePfp: {
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -15,
  },
  morePfpText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
  },
});

export default MatchesScreen;
