import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  useEffect(() => {
    fetch("https://task-manager-4xtp.onrender.com/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  // Add task
  const addTask = async () => {
    if (!task) return;

    const response = await fetch(
      "https://task-manager-app-1-wn5m.onrender.com/api/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: task }),
      }
    );

    const newTask = await response.json();

    setTasks([...tasks, newTask]);
    setTask("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <div>
        {tasks.map((t) => (
          <p key={t._id}>{t.title}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
