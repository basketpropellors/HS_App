import React from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

export default function AddTaskScreen() {
  const router = useRouter();
  const [taskName, setTaskName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const [priority, setPriority] = React.useState('Medium');

  const handleAddTask = () => {
    // Logic to add the task will go here
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Task Name</ThemedText>
      <TextInput
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
        placeholder="Enter task name"
      />
      <ThemedText style={styles.label}>Description</ThemedText>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        multiline
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
