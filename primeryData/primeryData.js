const { Todo } = require("../Routes/Todos/todoModel");
const User = require("../Routes/Users/userModel");
const chalk = require("chalk");
const { generateHashPassword } = require("../services/bcrypt");

const data = {
  users: [
    {
      name: "user",
      email: "user@gmail.com",
      password: 123456,
    },
    {
      name: "admin",
      email: "admin@gmail.com",
      password: 123456,
      isAdmin: true,
    },
  ],
  todos: [
    {
      title: "First Todo",
      description: "My First Todo",
      priority: 1,
      category: "Teacher Task",
      user_id: "621f3f27dde069e62aa3bcab",
      dueDate: new Date(2022, 07, 24, 10, 30, 00, 0),
      inResponsibilityOf: "David Yakin",
    },
    {
      title: "Second Todo",
      description: "My Second Todo",
      priority: 2,
      category: "Teacher Task",
      user_id: "621f3f27dde069e62aa3bcab",
      dueDate: new Date(2022, 06, 20, 10, 30, 00, 0),
      remarks: "Do Not fuck it up!",
      inResponsibilityOf: "Shoshi Yakin",
    },
    {
      title: "Third Todo",
      description: "My Third Todo",
      priority: 3,
      category: "Teacher Task",
      user_id: "621f3f27dde069e62aa3bcab",
      dueDate: new Date(2022, 01, 01, 10, 30, 00, 0),
      inResponsibilityOf: "Ruhama golan",
    },
  ],
};

async function primaryUsers(user) {
  try {
    user = new User(user);
    user.password = generateHashPassword(user.password);
    await user.save();
  } catch (error) {
    console.log(chalk.redBright(error.message));
  }
}

async function primaryTodos(todo) {
  try {
    todo = new Todo(todo);
    await todo.save();
  } catch (error) {
    console.log(chalk.redBright(error.message));
  }
}

const primaryData = () => {
  for (let i of data.users) {
    primaryUsers(i);
  }
  for (let i of data.todos) {
    primaryTodos(i);
  }
};

module.exports = primaryData;
