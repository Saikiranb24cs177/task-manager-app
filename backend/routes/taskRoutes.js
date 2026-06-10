const express = require("express");
const router = express.Router();

let tasks = [];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const newTask = {
    _id: Date.now(),
    title: req.body.title,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    completed: false,
  };

  tasks.push(newTask);

  res.json(newTask);
});

module.exports = router;