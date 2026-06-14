import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Index() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const saveTasks = async () => {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem("tasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  };

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false,
      date: new Date().toLocaleString(),
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
  };

  const completeTask = (id: string) => {
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }

      return item;
    });

    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager 🚀</Text>

      

      <Text style={styles.count}>Total Tasks: {tasks.length}</Text>

      <Text style={styles.completed}>
        Completed: {completedCount} ✅
      </Text>

      <Text style={styles.pending}>
        Pending: {pendingCount} ⏳
      </Text>

      <TextInput
        placeholder="Enter a task..."
        placeholderTextColor="#888"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />

      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearAllTasks}
      >
        <Text style={styles.buttonText}>Clear All Tasks</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Search tasks..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View>
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.completedTask,
                ]}
              >
                {item.text}
              </Text>

              <Text style={styles.date}>{item.date}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => completeTask(item.id)}
              >
                <Text style={styles.buttonText}>
                  {item.completed ? "Undo" : "Complete"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
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
    backgroundColor: "#0B1020",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },


  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  count: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 5,
  },

  completed: {
    color: "lightgreen",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 5,
  },

  pending: {
    color: "orange",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    fontSize: 18,
    marginBottom: 15,
  },

  addButton: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 15,
  },

  clearButton: {
    backgroundColor: "#DC2626",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  taskCard: {
    backgroundColor: "#18233A",
    padding: 20,
    borderRadius: 14,
    marginBottom: 15,
  },

  taskText: {
    color: "white",
    fontSize: 24,
    marginBottom: 8,
  },

  completedTask: {
    textDecorationLine: "line-through",
    color: "lightgreen",
  },

  date: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 15,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  completeButton: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "red",
    padding: 14,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
});