const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
let isTodoListEmpty = true;

const BASE_URL = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", loadTodos)

async function loadTodos() {
    const response = await fetch(`${BASE_URL}/api/v1/todos`); // GET Request
    if (!response.ok) {
        alert("The URL is not valid!")
    }

    // Converting ReadableStream into JS Object
    const data = await response.json(); // {success: true, allTodos: [{},{},...,{}]}
    console.log(data.allTodos);
    renderTodos(data.allTodos)
}

todoForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Form is submitted!")

    const newTaskText = todoInput.value.trim(); // Assigning the value of input to variable "newTaskText"

    if (newTaskText === "") {
        alert("Please enter a task!")
        return;
    }

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            taskText: newTaskText,
            isTaskDone: false
        })
    }

    const response = await fetch(`${BASE_URL}/api/v1/todos`, requestOptions)
    if (!response.ok) {
        alert("Add Todo Fetch URL is invalid!")
    }

    
    const data = await response.json()
    console.log(data)

    const newListItem = createListItem(data.newTask);
    
    if (isTodoListEmpty) {
        todoList.innerHTML = "";
        isTodoListEmpty = false;
    }
    
    todoList.prepend(newListItem); // <ul></ul>
    todoInput.value = "";
})


async function deleteTask(taskIdToBeDeleted){
    console.log(`Deleting the task with ${taskIdToBeDeleted}`)
    const response = await fetch(`${BASE_URL}/api/v1/todos/${taskIdToBeDeleted}`, {
        method: "DELETE"
    })
    if(!response.ok){
        alert("Pass the valid fetch url to delete")
    }
    const data = await response.json();
    console.log(data);
    if(data.success){
        const listItemToBeRemoved = document.getElementById(taskIdToBeDeleted);
        listItemToBeRemoved.remove();
        const listItems = document.querySelectorAll(".taskContainer")
        // console.log(listItems);
        if(!listItems.length){
            console.log("TodoList is Empty!")
            todoList.innerHTML = "<p>No todos. Please add some tasks.</p>"
        }
    }
}

async function toggleTask(taskIdTobeToggled){
    const response = await fetch(`${BASE_URL}/api/v1/todos/toggle/${taskIdTobeToggled}`, {
        method: "PATCH"
    });
    if(!response.ok){
        alert("Pass the valid fetch url to toggle patch")
    }
    const data = await response.json();
    console.log(data);
}

function createListItem(taskObject) {
    const newListItem = document.createElement("li"); // <li></li>
    newListItem.setAttribute("class", "taskContainer")
    newListItem.setAttribute("id", taskObject.taskId)


    const isTaskDoneCheckBox = document.createElement('input');
    isTaskDoneCheckBox.setAttribute("type", "checkbox")

    isTaskDoneCheckBox.addEventListener("change", () => toggleTask(taskObject.taskId))

    console.log(isTaskDoneCheckBox.checked)
    isTaskDoneCheckBox.checked = taskObject.isTaskDone;

    // isTaskDoneCheckBox.checked -> true/ false


    const p = document.createElement('p');
    p.setAttribute("id", "taskContent")

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskObject.taskText;

    const timeStampSpan = document.createElement('span');
    timeStampSpan.textContent = taskObject.timeStamp;
    console.log(taskObject.timeStamp)

    p.appendChild(taskTextSpan)
    p.appendChild(timeStampSpan)

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute("id", "taskDeleteBtn")
    deleteBtn.textContent = "X"

    deleteBtn.addEventListener("click", () => deleteTask(taskObject.taskId))

    newListItem.appendChild(isTaskDoneCheckBox);
    newListItem.appendChild(p);
    newListItem.appendChild(deleteBtn);

    return newListItem;  //<li>Go to Market</li>
}

function renderTodos(todos) {
    todoList.innerHTML = "";

    // I am rendering the UI for the Empty State / Data from the server.
    if (!todos.length) {
        todoList.innerHTML = "<p>No todos found. Please add some tasks.</p>"
        return;
    }

    isTodoListEmpty = false;
    todos.map((todo) => {
        const newListItem = createListItem(todo)
        todoList.prepend(newListItem) // <ul><li>Go to School</li> <li>Go to Market</li> </ul>
    })
}