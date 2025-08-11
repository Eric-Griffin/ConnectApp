import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

// This component now receives the `matches` array and `navigation` prop
function MatchesScreen({ matches, navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Matches</Text>
      </View>

      {/* We check if the matches array is empty */}
      {matches.length === 0 ? (
        // If it's empty, show this message
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No matches yet.</Text>
          <Text style={styles.emptySubtext}>Keep swiping to find your concert buddy!</Text>
        </View>
      ) : (
        // If it's not empty, we render a card for each match
        <View style={styles.listContainer}>
          {matches.map((match: any) => (
            <TouchableOpacity 
              key={match.id} 
              style={styles.matchCard}
              // When tapped, navigate to the Chat screen
              onPress={() => navigation.navigate('Chat', { user: match })}
            >
              <Image source={{ uri: match.image }} style={styles.matchImage} />
              <View style={styles.matchTextContainer}>
                <Text style={styles.matchName}>{match.name}</Text>
                <Text style={styles.matchBio} numberOfLines={1}>{match.bio}</Text>
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
  matchCard: {
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
  matchImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // Make it a circle
  },
  matchTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  matchName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  matchBio: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
});

export default MatchesScreen;
