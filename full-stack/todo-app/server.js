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
  const { taskText, isTaskDone } = req.body; // Backend developer is expecting taskText and isTaskDone from the request.body = {}
  // {} Destructuring

  if (typeof taskText !== "string" || !taskText.trim()) {
    res.status(400).json({
      error: true,
      message: "Task text should be string and It shouldn't be empty!"
    }) // returned this response
  }

  const newTask = todoStoreInstance.saveTodo(taskText, isTaskDone);

  res.status(201).json({
    success: true,
    message: "New Task has been created successfully!",
    newTask: newTask
  })

})

app.get("/", (request, response) => {
  console.log(path.join(__dirname, "public", "index.html"))
  response.sendFile(path.join(__dirname, "public", "index.html"))
})

app.delete("/api/v1/todos/:taskId", (req, res) => {
  // console.log(req.params);
  const {taskId} = req.params; // Object Destructuring
  console.log(typeof taskId);

  const isTaskDeleted = todoStoreInstance.deleteTask(Number(taskId));
  if(!isTaskDeleted) {
    res.status(400).json({
      error: "true",
      message: "Task's been not deleted!"
    })
  }

  res.status(200).json({
    success: true,
    message: "Task's been deleted successfully!"
  })
})

app.patch("/api/v1/todos/toggle/:taskId", (req, res) => {
  const {taskId} = req.params;
  console.log(typeof taskId);

  if(!taskId){
    res.status(400).json({
      error: true,
      message: "You should pass taskId as param, to toggle it!"
    })
  }

  const isTaskToggled = todoStoreInstance.toggleTask(Number(taskId));

  if(!isTaskToggled){
    res.status(400).json({
      error: true,
      message: `Task with ${taskId} hasn't been toggled!` 
    })
  }

  res.status(200).json({
    success: true,
    message: "Task has been toggled successfully!"
  })

})

app.listen(PORT, function () {
  console.log("Server is running at port: ", PORT);
});