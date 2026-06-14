import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
   import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
export default function Index() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
  loadTasks();
}, []);

useEffect(() => {
  saveTasks();
}, [tasks]);

const saveTasks = async () => {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.log(error);
  }
};

const loadTasks = async () => {
  try {
    const storedTasks = await AsyncStorage.getItem("tasks");

    if (storedTasks !== null) {
      setTasks(JSON.parse(storedTasks));
    }
  } catch (error) {
    console.log(error);
  }
};

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now().toString(),
      text: task,
      date: new Date().toLocaleString(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };
   const editTask = (item: any) => {
  setTask(item.text);
  deleteTask(item.id);
};
  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
  };
  const clearAllTasks = () => {
  setTasks([]);
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#081229",
        padding: 20,
        paddingTop: 70,
      }}
    >
      <Text
        style={{
          fontSize: 36,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Task Manager 🚀
      </Text>

      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 20,
          marginBottom: 5,
        }}
      >
        Total Tasks: {tasks.length}
      </Text>

      <Text
        style={{
          color: "lightgreen",
          textAlign: "center",
          fontSize: 20,
        }}
      >
        Completed: {tasks.filter((t) => t.completed).length} ✅
      </Text>

      <Text
        style={{
          color: "orange",
          textAlign: "center",
          fontSize: 20,
          marginBottom: 25,
        }}
      >
        Pending: {tasks.filter((t) => !t.completed).length} ⏳
      </Text>

      <TextInput
        placeholder="Enter a task..."
        placeholderTextColor="gray"
        value={task}
        onChangeText={setTask}
        style={{
          backgroundColor: "white",
          padding: 18,
          borderRadius: 15,
          fontSize: 18,
          marginBottom: 15,
        }}
      />

      <TouchableOpacity
        onPress={addTask}
        style={{
          backgroundColor: "#2563eb",
          padding: 18,
          borderRadius: 15,
          marginBottom: 25,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Add Task
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
  onPress={clearAllTasks}
  style={{
    backgroundColor: "red",
    padding: 18,
    borderRadius: 15,
    marginBottom: 25,
  }}
>
  <Text
    style={{
      color: "white",
      textAlign: "center",
      fontSize: 24,
      fontWeight: "bold",
    }}
  >
    Clear All Tasks
  </Text>
</TouchableOpacity>
<TextInput
  placeholder="Search tasks..."
  placeholderTextColor="gray"
  value={search}
  onChangeText={setSearch}
  style={{
    backgroundColor: "white",
    padding: 18,
    borderRadius: 15,
    fontSize: 18,
    marginBottom: 20,
  }}
/>
      <FlatList
        data={tasks.filter((item) =>
  item.text.toLowerCase().includes(search.toLowerCase())
)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#16213e",
              padding: 20,
              borderRadius: 15,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                color: item.completed ? "lightgreen" : "white",
                fontSize: 22,
                textDecorationLine: item.completed
                  ? "line-through"
                  : "none",
                marginBottom: 15,
              }}
            >
              {item.text}
              <Text
  style={{
    color: "gray",
    fontSize: 14,
    marginTop: 5,
  }}
>
  {item.date}
</Text>
            </Text>

            <View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
  }}
>
              <TouchableOpacity
                onPress={() => completeTask(item.id)}
                style={{
                  backgroundColor: "green",
                  padding: 15,
                  borderRadius: 12,
                  width: "48%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Complete
                </Text>
              </TouchableOpacity>
               <TouchableOpacity
  onPress={() => editTask(item)}
  style={{
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 12,
    width: "30%",
  }}
>
  <Text
    style={{
      color: "white",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    }}
  >
    Edit
  </Text>
</TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteTask(item.id)}
                style={{
                  backgroundColor: "red",
                  padding: 15,
                  borderRadius: 12,
                  width: "48%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
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