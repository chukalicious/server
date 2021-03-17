const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const UsersRouter = require("./users/users-router");
const AuthRouter = require("./auth/auth-router");
const TasksRouter = require("./tasks/tasks-router");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", UsersRouter);
server.use("/", AuthRouter);
server.use("/api/tasks", TasksRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "api up!" });
});

module.exports = server;
