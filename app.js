require("./DB/connectToDb");
// require("./primeryData/primeryData")();
const express = require("express");
const app = express();

const usersRouter = require("./Routes/Users/userRouter");
const todosRouter = require("./Routes/Todos/todosRouter");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan(chalk.cyan(":method :url :status :response-time ms")));
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/todos", todosRouter);

const PORT = 8080;
app.listen(PORT, () =>
  console.log(chalk.blueBright.bold(`server run on: http://:localhost:${PORT}`))
);
