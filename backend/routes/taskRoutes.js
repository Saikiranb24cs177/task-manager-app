```javascript id="6w7j9k"
const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const newTask = new Task(req.body);

  const savedTask = await newTask.save();

  res.json(savedTask);
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.json({ message: "Task deleted" });
});

module.exports = router;
```
