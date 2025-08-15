import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

const MatchCard = ({ match, onPress }) => (
    <TouchableOpacity style={styles.matchCard} onPress={onPress}>
        <Image source={{ uri: match.image }} style={styles.matchImage} />
        <View style={styles.matchTextContainer}>
        <Text style={styles.matchName}>{match.name}</Text>
        <Text style={styles.matchBio} numberOfLines={1}>{match.bio}</Text>
        </View>
    </TouchableOpacity>
);

function EventMatchesScreen({ navigation, route }) {
  const { eventName, matchesForEvent } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{eventName}</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {matchesForEvent.map((match) => (
            <MatchCard 
                key={match._id} 
                match={match} 
                onPress={() => navigation.navigate('Chat', { user: match })}
            />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
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
    borderRadius: 30,
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

export default EventMatchesScreen;
