const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
let isTodoListEmpty = true; // flags , booleans

const BASE_URL = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", loadTodos)

async function loadTodos(){
    const response = await fetch(`${BASE_URL}/api/v1/todos`); // GET Request
    if(!response.ok){
        alert("The URL is not valid!")
    }

    // Converting ReadableStream into JS Object
    const data = await response.json(); // {success: true, allTodos: [{},{},...,{}]}
    console.log(data.allTodos);
    renderTodos(data.allTodos)
}

todoForm.addEventListener("submit", async function(event){
    event.preventDefault();
    console.log("Form is submitted!")
    
    const newTodoText = todoInput.value.trim();
    if(newTodoText === ""){
        alert("Please enter a task!")
        return;
    }

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            taskText: newTodoText,
            isTaskDone: false
        })
    }
    const response = await fetch(`${BASE_URL}/api/v1/todos`, options)
    if(!response.ok){
        alert("Add Todo Fetch URL is invalid!")
    }

    todoInput.value = "";

    const data = await response.json()
    console.log(data.newTask);

    const newListItem = createListItem(data.newTask);

    if(isTodoListEmpty){
        todoList.innerHTML = "";
        isTodoListEmpty = false;
    }

    todoList.prepend(newListItem);
})

function createListItem(taskObject){
    const newListItem = document.createElement("li"); // <li></li>
    newListItem.textContent = taskObject.taskText; // <li>Go to Market</li>
    return newListItem;
}

function renderTodos(todos){
    todoList.innerHTML = "";

    // I am maintaining the Empty State
    if(!todos.length){
        todoList.innerHTML = "<p>No todos found. Please add some tasks.</p>"
        return;
    }
    
    isTodoListEmpty = false;
    todos.map((todo) => {
        const newListItem = createListItem(todo)
        todoList.prepend(newListItem) // <ul><li>Go to School</li> <li>Go to Market</li> </ul>
    }) // ()=>{}
}