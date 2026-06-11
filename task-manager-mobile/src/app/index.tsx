import React, { useState } from 'react';
import {
  View,
  Text,
 StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);

  const completedTasks = tasks.filter(
    (t) => t.completed
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  const addTask = () => {
    if (task.trim() === '') return;

    const newTask = {
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];

    updatedTasks[index].completed =
      !updatedTasks[index].completed;

    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager 🚀</Text>

      <Text style={styles.count}>
        Total Tasks: {tasks.length}
      </Text>

      <Text style={styles.completed}>
        Completed: {completedTasks} ✅
      </Text>

      <Text style={styles.pending}>
        Pending: {pendingTasks} ⏳
      </Text>

      <TextInput
        placeholder="Enter a task..."
        placeholderTextColor="gray"
        style={styles.input}
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearAllTasks}
      >
        <Text style={styles.clearText}>Clear All Tasks</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Search tasks..."
        placeholderTextColor="gray"
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text
              style={[
                styles.taskItem,
                item.completed && styles.completedTask,
              ]}
            >
              {item.text}
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => completeTask(index)}
              >
                <Text style={styles.completeText}>
                  {item.completed
                    ? 'Completed ✅'
                    : 'Complete'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(index)}
              >
                <Text style={styles.deleteText}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },

  count: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },

  completed: {
    color: 'lightgreen',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5,
  },

  pending: {
    color: 'orange',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    marginTop: 5,
  },

  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  searchInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },

  clearButton: {
    backgroundColor: '#dc2626',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },

  clearText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  taskContainer: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  taskItem: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },

  completedTask: {
    textDecorationLine: 'line-through',
    color: 'lightgreen',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  completeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },

  completeText: {
    color: 'white',
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },

  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});