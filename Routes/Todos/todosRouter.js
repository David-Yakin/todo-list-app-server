const { Todo } = require("./todoModel");
const express = require("express");
const auth = require("../../middlewares/authorization");
const router = express.Router();
const chalk = require("chalk");
const { validateTodo } = require("./todoValidation");

router.get("/todos", auth, async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.send(todos);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.get("/todo/:id", async (req, res) => {
  try {
    const todo_id = req.params.id;
    const todo = await Todo.findOne({ _id: todo_id });
    return res.send(todo);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    let todo = req.body;

    const { error } = validateTodo(todo);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }

    todo.user_id = req.user._id;
    todo = new Todo(todo);

    todo = await todo.save();
    return res.send(todo);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let todo = req.body;
    delete todo._id;
    const { error } = validateTodo(todo);
    if (error) {
      const errorMessage = error.details[0].message;
      console.log(chalk.redBright(errorMessage));
      return res.status(400).send(errorMessage);
    }

    const filter = {
      _id: req.params.id,
      user_id: req.user._id,
    };

    todo = await Todo.findOneAndUpdate(filter, todo);
    if (!todo) {
      console.log(chalk.redBright("No todo with this ID in the database!"));
      return res.status(404).send("No todo with this ID in the database!");
    }
    todo = await Todo.findById(todo._id);
    return res.send(todo);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let todo = await Todo.findOneAndRemove({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!todo) {
      console.log(chalk.redBright("Un authorized user!"));
      return res.status(403).send("You are not authorize to delete this todo");
    }

    return res.send(todo);
  } catch (error) {
    console.log(chalk.redBright("Could not delete this todo:", error.message));
    return res.status(500).send(error.message);
  }
});

router.patch("/isCompleted/:id", auth, async (req, res) => {
  try {
    const user = req.user;
    let todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user_id: user._id },
      { completed: !completed }
    ).save();

    return res.send(todo);
  } catch (error) {
    console.log(chalk.redBright("Could not edit like:", error.message));
    return res.status(500).send(error);
  }
});

module.exports = router;
