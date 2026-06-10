const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  dueDate: {
    type: String,
    default: "No date",
  },

  priority: {
    type: String,
    default: "Medium",
  },
});

module.exports = mongoose.model("Task", taskSchema);