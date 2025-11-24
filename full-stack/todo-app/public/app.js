const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
console.log("Welcome to todo application")

document.addEventListener("DOMContentLoaded", loadTodos)
const BASE_URL = "http://localhost:3000"

async function loadTodos(){
    const response = await fetch(`${BASE_URL}/api/v1/todos`);
    if(!response.ok){
        alert("The URL is not valid!")
    }
    console.log(response);

    const data = await response.json();
    
    console.log(typeof data, data);

    renderTodos(data.allTodos)
}

todoForm.addEventListener("submit", function(event){
    event.preventDefault();
    console.log("Button is clicked!")
    const newTodoText = todoInput.value.trim();
    if(newTodoText === ""){
        alert("Please enter a task!")
        return;
    }

    todoInput.value = "";
})

function renderTodos(todos){
    todoList.inneHTML = "";
    todos.map((todo) => {
        console.log(todo)
        console.log(todo.taskText);
        const li = document.createElement("li");
        li.textContent = todo.taskText;
        todoList.prepend(li)
    })
}

