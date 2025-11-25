const express = require("express");
const path = require("path");
const { TodoStore } = require("./TodoStore.js");

console.log("Welcome to your first backend server...")

const app = express();
const publicAbsolutePath = path.join(__dirname, "public");
const hostThePublic = express.static(publicAbsolutePath);

const todoStoreInstance = new TodoStore();

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
    success: true,
    allTodos: allTodos // Array of Task Objects [{}, {}, ....{}]
  }) 
  // res -> headers -> Content-Type: "application/json; charset=utf-8"
})

app.post("/api/v1/todos", (req, res) => {
  const { taskText, isTaskDone } = req.body;

  if (!taskText.trim() || typeof taskText !== "string") {
    res.status(400).json({
      error: true,
      message: "Task text should be string and It shouldn't be empty!"
    }) // returned this response
  }

  const newTask = todoStoreInstance.saveTodo(taskText, isTaskDone);

  res.status(201).json({
    success: true,
    message: "New Task is created successfully!",
    newTask: newTask
  })

})

app.get("/", (request, response) => {
  console.log(path.join(__dirname, "public", "index.html"))
  response.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(PORT, function () {
  console.log("Server is running at port: ", PORT);
});