import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const MessageBubble = ({ text, isMyMessage }) => (
  <View style={[
    styles.messageBubble,
    isMyMessage ? styles.myMessage : styles.theirMessage
  ]}>
    <Text style={isMyMessage ? styles.myMessageText : styles.theirMessageText}>{text}</Text>
  </View>
);

// The component now receives the `route` prop, which contains the user data
function ChatScreen({ navigation, route }) {
  // 1. We get the specific user object from the route params.
  const { user } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        {/* 2. We use the user's name from the data instead of a hardcoded name. */}
        <Text style={styles.headerTitle}>{user.name}</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.messageList}>
            <MessageBubble text={`Hey! Saw we matched for the event.`} isMyMessage={false} />
            <MessageBubble text="Yeah! So excited for it." isMyMessage={true} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
          />
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
  },
  sendButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    marginVertical: 4,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  myMessageText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  theirMessageText: {
    fontSize: 16,
    color: '#1A1A1A',
  }
});

export default ChatScreen;
