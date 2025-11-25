
let nextId = 1;

function Task(taskText, isTaskDone){
    this.taskId = nextId++;
    this.taskText = taskText;
    this.isTaskDone = isTaskDone;
    this.timeStamp = Date.now();
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

TodoStore.prototype.toggleTask = function(taskIdToUpdate){
    const taskWithId = this.todoStore.find((task)=>(task.taskId === taskIdToUpdate));
    taskWithId.isTaskDone = !taskWithId.isTaskDone
    
    // if(taskWithId){
    //     taskWithId.isTaskDone = false
    // }else{
    //     taskWithId.isTaskDone = true;
    // }
}


module.exports = {
    TodoStore,
    Task
}