const express = require("express");
const path = require("path");
const { TodoStore } = require("./TodoStore.js");

console.log("Welcome to your first backend server...")

const app = express();
const publicAbsolutePath = path.join(__dirname, "public");
const hostThePublic = express.static(publicAbsolutePath);

const todoStoreInstance = new TodoStore();
todoStoreInstance.saveTodo("Go to Market", false)
todoStoreInstance.saveTodo("Buy Milk", false)

// Middlewares
app.use(hostThePublic);
app.use(express.json());

const PORT = 3000;

app.get("/welcome", (request, response) => {
  response.json({
    message: "Welcome to first api calling...."
  })
})

app.get("/api/v1/todos", (req, res) => {
  const allTodos = todoStoreInstance.getAllTodos();

  res.status(200).json({
    status: true,
    allTodos: allTodos
  }) 
  // res -> headers -> Content-Type: "application/json; charset utf-8"
})

app.post("/api/v1/todos", (req, res) => {
  const { taskText, isTaskDone } = req.body;
  if (!taskText.trim()) {
    res.status(400).json({
      error: true,
      message: "data is not valid, It shouldn't be empty!"
    })
  }

  const newTask = todoStoreInstance.saveTodo(taskText, isTaskDone);
  if (!newTask.taskText) {
    res.status(400).json({
      error: true,
      message: "task is not saved properly!"
    })
  }

  res.status(201).json({
    success: true,
    message: "New Task is created successfully!"
  })
})

app.get("/", (request, response) => {
  console.log(path.join(__dirname, "public", "index.html"))
  response.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(PORT, function () {
  console.log("Server is running at port: ", PORT);
});