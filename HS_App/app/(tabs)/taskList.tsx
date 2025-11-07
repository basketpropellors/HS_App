import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTasks, Task } from '@/context/TasksContext';
import { Swipeable } from 'react-native-gesture-handler';

export default function TaskListScreen() {
  const router = useRouter();
  const { tasks, toggleTaskCompletion } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const incompleteTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const renderRightActions = (taskId: string) => {
    return (
      <TouchableOpacity
        onPress={() => toggleTaskCompletion(taskId)}
        style={styles.completeButton}>
        <ThemedText style={styles.completeButtonText}>Complete</ThemedText>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: Task }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <ThemedView style={styles.taskItem}>
        <View>
          <ThemedText style={styles.taskTitle}>{item.title}</ThemedText>
          <ThemedText style={styles.taskDueDate}>Due: {item.dueDate}</ThemedText>
        </View>
        <ThemedText style={[styles.taskPriority, { backgroundColor: getPriorityColor(item.priority) }]}>
          {item.priority}
        </ThemedText>
      </ThemedView>
    </Swipeable>
  );

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High':
        return '#FF0000';
      case 'Medium':
        return '#FFA500';
      case 'Low':
        return '#008000';
      default:
        return '#808080';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ThemedText style={styles.sectionTitle}>To Do</ThemedText>
      <FlatList
        data={incompleteTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <ThemedText style={styles.sectionTitle}>Completed</ThemedText>
      <FlatList
        data={completedTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/addTask')}>
        <IconSymbol name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 10,
  },
  listContainer: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  taskTitle: {
    fontSize: 16,
  },
  taskDueDate: {
    fontSize: 12,
    color: 'gray',
  },
  taskPriority: {
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  completeButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
