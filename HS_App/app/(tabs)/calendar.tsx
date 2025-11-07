import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Calendar } from 'react-native-calendars';
import { useTasks, Task } from '@/context/TasksContext';

export default function CalendarScreen() {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState('');

  const markedDates = () => {
    const marked: { [key: string]: any } = {};
    tasks.forEach((task) => {
      marked[task.dueDate] = { marked: true, dotColor: 'blue' };
    });
    if (selectedDate) {
      marked[selectedDate] = { ...marked[selectedDate], selected: true, selectedColor: 'blue' };
    }
    return marked;
  };

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const tasksForSelectedDate = tasks.filter((task) => task.dueDate === selectedDate);

  const renderItem = ({ item }: { item: Task }) => (
    <ThemedView style={styles.taskItem}>
      <ThemedText style={styles.taskTitle}>{item.title}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <Calendar
        markedDates={markedDates()}
        onDayPress={onDayPress}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
        }}
      />
      <FlatList
        data={tasksForSelectedDate}
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
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  taskTitle: {
    fontSize: 16,
  },
});
