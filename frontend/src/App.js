import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    setTasks(JSON.parse(savedTasks));
  }
}, []);

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  // Fetch tasks
  useEffect(() => {
    fetch("https://task-manager-app-1-wn5m.onrender.com/api/tasks")
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
    <div className="container">
      <h1>Task Manager</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

    <button className="add-btn" onClick={addTask}>
  Add Task
</button>
      <button
  onClick={() => setTasks([])}
  style={{ marginLeft: "10px" }}
>
  Clear History
</button>

    <div>
  {tasks.map((t, index) => (
    <div key={t._id}>
      <p>
        Task {index + 1}: {t.title}
      </p>

      <p>
        Status: {t.completed ? "Completed ✅" : "Pending ⏳"}
      </p>

  <button
  className="pending"
  onClick={() => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = false;
    setTasks(updatedTasks);
  }}
>
  Pending
</button>
<button
  className="completed"
  onClick={() => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  }}
>
  Completed
</button>
   <button
  className="delete"
  onClick={() => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }}
>
  Delete
</button>

      <hr />
    </div>
  ))}
</div>
    </div>
  );
}

export default App;
