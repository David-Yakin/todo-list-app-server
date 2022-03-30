const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  completionDate: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  remarks: {
    type: String,
    minlength: 2,
    maxlength: 1024,
    default: "No remarks",
  },
  inResponsibilityOf: {
    type: String,
    minlength: 2,
    maxlength: 256,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sharedWith: [String],
});

const Todo = mongoose.model("todo", todoSchema);

exports.Todo = Todo;
