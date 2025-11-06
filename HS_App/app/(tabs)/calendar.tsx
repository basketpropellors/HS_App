import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen() {
  const tasks = {
    '2024-07-20': [{ name: 'Complete project proposal' }],
    '2024-07-22': [{ name: 'Review marketing materials' }],
    '2024-07-25': [{ name: 'Schedule team meeting' }],
  };

  const markedDates = () => {
    const marked: { [key: string]: any } = {};
    for (const date in tasks) {
      marked[date] = { marked: true, dotColor: 'blue' };
    }
    return marked;
  };

  const onDayPress = (day: any) => {
    const tasksForDay = tasks[day.dateString as keyof typeof tasks];
    if (tasksForDay) {
      alert(`Tasks for ${day.dateString}:\n${tasksForDay.map((task) => `- ${task.name}`).join('\n')}`);
    } else {
      alert(`No tasks for ${day.dateString}`);
    }
  };

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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
