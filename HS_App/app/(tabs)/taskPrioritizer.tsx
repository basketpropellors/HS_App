import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TaskPrioritizerScreen() {
  const tasks = [
    { id: '1', title: 'Complete project proposal', priority: 'High' },
    { id: '2', title: 'Review marketing materials', priority: 'Medium' },
    { id: '3', title: 'Schedule team meeting', priority: 'Low' },
    { id: '4', title: 'Prepare for presentation', priority: 'High' },
  ];

  const renderItem = ({ item }: { item: { id: string; title: string; priority: string } }) => (
    <ThemedView style={styles.taskItem}>
      <IconSymbol
        name={getPriorityIcon(item.priority)}
        size={24}
        color={getPriorityColor(item.priority)}
      />
      <ThemedText style={styles.taskTitle}>{item.title}</ThemedText>
      <ThemedText style={[styles.taskPriority, { color: getPriorityColor(item.priority) }]}>
        {item.priority}
      </ThemedText>
    </ThemedView>
  );

  const getPriorityColor = (priority: string) => {
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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'arrow.up.circle.fill';
      case 'Medium':
        return 'arrow.right.circle.fill';
      case 'Low':
        return 'arrow.down.circle.fill';
      default:
        return 'questionmark.circle.fill';
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
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  taskTitle: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  taskPriority: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
