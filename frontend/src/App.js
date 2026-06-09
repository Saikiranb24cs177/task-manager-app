import { FaTrash, FaCheck, FaClock } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
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
        body: JSON.stringify({
  title: task,
  dueDate: dueDate,
  priority: priority
}),
      }
    );

    const newTask = await response.json();

    setTasks([...tasks, newTask]);
    setTask("");
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <p>Total Tasks: {tasks.length}</p>
      <p>Completed: {completedTasks} ✅</p>
      <p>Pending: {pendingTasks} ⏳</p>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

<input
  type="text"
  placeholder="Search task"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{ marginLeft: "10px" }}
/>

<input
  type="text"
  placeholder="Search task"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{ marginLeft: "10px" }}
/>
<select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
>
  <option>High</option>
  <option>Medium</option>
  <option>Low</option>
</select>
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
  {tasks
  .filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  )
  .map((t, index) => (
    <div key={t._id} className="task-card">
      <p>
        Task {index + 1}: {t.title}
      </p>
     <p>📅 Due Date: {t.dueDate}</p> 

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
  <FaClock /> Pending
</button>
<button
  className="completed"
  onClick={() => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  }}
>
  <FaCheck /> Completed
</button>

<button
  className="delete"
  onClick={() => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }}
  >
  <FaTrash /> Delete
</button>

      <hr />
    </div>
  ))}
</div>
    
  );
}

export default App;
