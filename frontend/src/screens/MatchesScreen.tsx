import React, { useMemo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';

import { useApp } from '../context/AppContext';
import CustomHeader from '../components/CustomHeader';

// 1. We define the "shape" of our data to fix all TypeScript errors.
type Match = {
  _id: string;
  name: string;
  age: number;
  bio: string;
  image: string;
  eventId: string;
};

type Event = {
  _id: string;
  name: string;
  coverImageURL: string;
};

// This is the component for the Event Banner
const EventMatchBanner = ({ event, matchesForEvent, onPress }: { event: Event, matchesForEvent: Match[], onPress: () => void }) => {
  const displayedMatches = matchesForEvent.slice(0, 3);
  const remainingMatches = matchesForEvent.length - displayedMatches.length;

  return (
    <TouchableOpacity style={styles.bannerCard} onPress={onPress}>
      <Image source={{ uri: event.coverImageURL }} style={styles.bannerImage} />
      <View style={styles.bannerOverlay} />
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

function MatchesScreen({ navigation }: any) {
  const { matches, likedEvents } = useApp();

  const groupedMatches = useMemo(() => {
    if (!matches || matches.length === 0) return [];

    // THIS IS THE FIX for the first error. We define the shape of `acc`.
    const groups = (matches as Match[]).reduce((acc: { [key: string]: Match[] }, match: Match) => {
      const eventId = match.eventId;
      if (!acc[eventId]) {
        acc[eventId] = [];
      }
      acc[eventId].push(match);
      return acc;
    }, {});

    return Object.keys(groups).map(eventId => {
      const eventDetails = (likedEvents as Event[]).find(e => e._id === eventId);
      return {
        eventId,
        event: eventDetails,
        matches: groups[eventId],
      };
    }).filter(group => group.event);
  }, [matches, likedEvents]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />

      {groupedMatches.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No matches yet.</Text>
          <Text style={styles.emptySubtext}>Keep swiping to find your concert buddy!</Text>
        </View>
      ) : (
        <FlatList
          data={groupedMatches}
          keyExtractor={(item) => item.eventId}
          renderItem={({ item }) => {
            // THIS IS THE FIX for the other two errors. We check if item.event exists.
            if (!item.event) {
              return null; // Don't render anything if the event details are missing
            }
            return (
              <EventMatchBanner
                event={item.event}
                matchesForEvent={item.matches}
                onPress={() => navigation.navigate('EventMatches', { 
                  eventName: item.event!.name,
                  matchesForEvent: item.matches 
                })}
              />
            );
          }}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={() => <Text style={styles.title}>Matches</Text>}
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
    color: '#A8D1E7',
    paddingHorizontal: 10,
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
    padding: 10,
  },
  bannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
    height: 120,
    borderRadius: 16,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
  },
  bannerTextContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  bannerTitle: {
    fontSize: 20,
    fontFamily: 'Sk-Modernist-Bold',
    color: '#FFFFFF',
    lineHeight: 26,
  },
  bannerSubtitle: {
    fontSize: 14,
    fontFamily: 'Sk-Modernist-Regular',
    color: '#FFFFFF',
    marginTop: 2,
  },
  matchPfpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: -30,
    marginLeft: 10,
  },
  matchPfp: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  morePfp: {
    backgroundColor: '#EFEFF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -15,
  },
  morePfpText: {
    fontSize: 12,
    fontFamily: 'Sk-Modernist-Bold',
    color: '#8E8E93',
  },
});

export default MatchesScreen;
