import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useTasks } from '@/context/TasksContext';

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const handleAddTask = () => {
    if (!title || !dueDate) {
      Alert.alert('Validation Error', 'Task Title and Due Date are required.');
      return;
    }
    addTask({ title, dueDate, priority });
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Task Title</ThemedText>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />
      <ThemedText style={styles.label}>Due Date</ThemedText>
      <TextInput
        style={styles.input}
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="Enter due date (e.g., YYYY-MM-DD)"
      />
      <ThemedText style={styles.label}>Priority</ThemedText>
      <View style={styles.priorityContainer}>
        <Button
          title="Low"
          onPress={() => setPriority('Low')}
          color={priority === 'Low' ? '#007BFF' : '#ccc'}
        />
        <Button
          title="Medium"
          onPress={() => setPriority('Medium')}
          color={priority === 'Medium' ? '#007BFF' : '#ccc'}
        />
        <Button
          title="High"
          onPress={() => setPriority('High')}
          color={priority === 'High' ? '#007BFF' : '#ccc'}
        />
      </View>
      <Button title="Add Task" onPress={handleAddTask} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
});
