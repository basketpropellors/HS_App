import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TaskListScreen() {
  const router = useRouter();
  const tasks = [
    { id: '1', title: 'Complete project proposal', status: 'In Progress' },
    { id: '2', title: 'Review marketing materials', status: 'To Do' },
    { id: '3', title: 'Schedule team meeting', status: 'Done' },
    { id: '4', title: 'Prepare for presentation', status: 'In Progress' },
  ];

  const renderItem = ({ item }: { item: { id: string; title: string; status: string } }) => (
    <ThemedView style={styles.taskItem}>
      <ThemedText style={styles.taskTitle}>{item.title}</ThemedText>
      <ThemedText style={[styles.taskStatus, { backgroundColor: getStatusColor(item.status) }]}>
        {item.status}
      </ThemedText>
    </ThemedView>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return '#FFA500';
      case 'To Do':
        return '#FF0000';
      case 'Done':
        return '#008000';
      default:
        return '#808080';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={tasks}
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
  listContainer: {
    padding: 10,
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
  taskStatus: {
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
});
