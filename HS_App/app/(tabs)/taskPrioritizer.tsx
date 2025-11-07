import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTasks, Task } from '@/context/TasksContext';

export default function TaskPrioritizerScreen() {
  const { tasks, updateTask } = useTasks();

  const changePriority = (task: Task, newPriority: 'High' | 'Medium' | 'Low') => {
    updateTask({ ...task, priority: newPriority });
  };

  const renderItem = ({ item }: { item: Task }) => (
    <ThemedView style={styles.taskItem}>
      <View style={styles.priorityButtons}>
        <TouchableOpacity onPress={() => changePriority(item, 'High')}>
          <IconSymbol
            name="arrow.up.circle.fill"
            size={24}
            color={item.priority === 'High' ? '#FF0000' : '#ccc'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changePriority(item, 'Medium')}>
          <IconSymbol
            name="arrow.right.circle.fill"
            size={24}
            color={item.priority === 'Medium' ? '#FFA500' : '#ccc'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changePriority(item, 'Low')}>
          <IconSymbol
            name="arrow.down.circle.fill"
            size={24}
            color={item.priority === 'Low' ? '#008000' : '#ccc'}
          />
        </TouchableOpacity>
      </View>
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

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={[...tasks].sort((a, b) => {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        })}
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
  priorityButtons: {
    flexDirection: 'row',
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
