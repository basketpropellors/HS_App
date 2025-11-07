import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function AiChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessageToAI = async (message: string) => {
    // Placeholder for API call
    return new Promise<{ text: string }>((resolve) => {
      setTimeout(() => {
        resolve({ text: `You said: "${message}"` });
      }, 1000);
    });
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const newUserMessage = { id: String(messages.length + 1), text: inputText, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputText('');

      const aiResponse = await sendMessageToAI(inputText);
      const newBotMessage = { id: String(messages.length + 2), text: aiResponse.text, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);

      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
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
        <TouchableOpacity onPress={handleSendMessage}>
            <IconSymbol name="paperplane.fill" size={24} color="#007BFF" />
        </TouchableOpacity>
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
    marginRight: 10,
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
