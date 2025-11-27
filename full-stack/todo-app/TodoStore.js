
let nextId = 1;

function Task(taskText, isTaskDone){
    this.taskId = nextId++;
    this.taskText = taskText;
    this.isTaskDone = isTaskDone;
    this.timeStamp = new Date();
}

function TodoStore(){
    this.todoStore = [];
}


TodoStore.prototype.saveTodo = function(taskText, isTaskDone){ 
    const newTask = new Task(taskText, isTaskDone);
    this.todoStore.push(newTask)
    return newTask;
}

TodoStore.prototype.getAllTodos = function(){
    return this.todoStore;
}

TodoStore.prototype.toggleTask = function(taskIdToBeToggled){
    const taskWithId = this.todoStore.find((task)=> task.taskId === taskIdToBeToggled);
    console.log(taskWithId);
    taskWithId.isTaskDone = !taskWithId.isTaskDone
    console.log(this.todoStore);
    return true;
}

TodoStore.prototype.deleteTask = function(taskIdToDelete){
    console.log(typeof taskIdToDelete)
    const taskIndex = this.todoStore.findIndex((task) => task.taskId === taskIdToDelete);
    console.log(taskIndex);
    this.todoStore.splice(taskIndex, 1);
    console.log(this.todoStore);
    return true;
}


module.exports = {
    TodoStore,
    Task
}