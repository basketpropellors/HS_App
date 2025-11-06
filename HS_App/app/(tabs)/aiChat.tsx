import React from 'react';
import { StyleSheet, TextInput, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AiChatScreen() {
  const [messages, setMessages] = React.useState([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'bot' },
    { id: '2', text: 'I need to organize my tasks for the week.', sender: 'user' },
    { id: '3', text: 'Of course. I can help with that. What is your first task?', sender: 'bot' },
  ]);
  const [inputText, setInputText] = React.useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: String(messages.length + 1), text: inputText, sender: 'user' }]);
      setInputText('');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((message) => (
          <ThemedView
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <ThemedText>{message.text}</ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSendMessage}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
});
