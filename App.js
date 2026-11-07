import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { id: Date.now().toString(), title: task.trim(), completed: false }]);
    setTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity style={styles.taskLeft} onPress={() => toggleTask(item.id)}>
        <View style={[styles.checkbox, item.completed && styles.checkboxDone]}>
          {item.completed && <Text style={styles.checkMark}>✓</Text>}
        </View>
        <Text style={[styles.taskText, item.completed && styles.taskTextDone]}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" />
      <Text style={styles.heading}>My Todo List</Text>
      <Text style={styles.subHeading}>
        {remaining} {remaining === 1 ? 'task' : 'tasks'} remaining
      </Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={task}
          onChangeText={setTask}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet. Add one!</Text>}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F4F8', paddingTop: 70, paddingHorizontal: 20 },
  heading: { fontSize: 32, fontWeight: '800', color: '#1E293B' },
  subHeading: { fontSize: 16, color: '#64748B', marginBottom: 20, marginTop: 4 },
  inputRow: { flexDirection: 'row', marginBottom: 20 },
  input: {
    flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16,
    paddingVertical: 12, fontSize: 16, elevation: 2,
  },
  addButton: {
    backgroundColor: '#4F46E5', width: 50, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', marginLeft: 10,
  },
  addButtonText: { color: '#fff', fontSize: 28, marginTop: -2 },
  taskCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 10, elevation: 2,
  },
  taskLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  checkbox: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#4F46E5',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  checkboxDone: { backgroundColor: '#4F46E5' },
  checkMark: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  taskText: { fontSize: 16, color: '#1E293B', flex: 1 },
  taskTextDone: { textDecorationLine: 'line-through', color: '#94A3B8' },
  deleteText: { fontSize: 20, color: '#EF4444', paddingHorizontal: 8 },
  empty: { textAlign: 'center', color: '#94A3B8', marginTop: 40, fontSize: 16 },
});