// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners 
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove Task Events
    taskList.addEventListener('click', removeTask);
    // Clear Tasks Event
    clearBtn.addEventListener('click', clearTasks);
    // Clear All Task Event
    clearBtn.addEventListener('click', clearAllTasks);
    // Filter Tasks
    filter.addEventListener('keyup', filterTasks);
}
// Get task from ls
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
            // PERSISTING THE TASKS TO localStorage

        // Create li element 
        const li = document.createElement('li');

        // Add Class
        li.className = 'collection-item';

        // Create text node and append to li
        li.appendChild(document.createTextNode(task))

        // Create a link element
        const link = document.createElement('a');

        // Add Class
        link.className = 'delete-item secondary-content';

        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append the link to the li
        li.appendChild(link);

        // Append li to the ul
        taskList.appendChild(li);
    });
}
// Add Task fn
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    //  else if (taskInput.value == ' ') {
    //     alert('Add a task');
    // }
    //  if(taskInput.value === null) {
    //     console.log(typeof taskInput.value);
    //     console.log(`Task: ${taskInput.value}`);
    // }
     else {

        // Create li element 
        const li = document.createElement('li');

        // Add Class
        li.className = 'collection-item';

        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value))

        // Create a link element
        const link = document.createElement('a');

        // Add Class
        link.className = 'delete-item secondary-content';

        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append the link to the li
        li.appendChild(link);

        // Append li to the ul
        taskList.appendChild(li);

        // Store in localStorage
        // parsing the task value as a param to have control of the (task).
        storeTaskInLocalStorage(taskInput.value);

        // Clear input
        taskInput.value = ' ';

        e.preventDefault();


    }

}

// Store Task
// (task) the actual task
function storeTaskInLocalStorage(task) {
    
    let tasks;
    
    // validate if there are tasks in the LS
    if(localStorage.getItem('tasks') === null) {
        // then tasks should be converted to an array
        tasks = [];
    } else {
        // if not empty the tasks should be converted to a string
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // then push task to the assigned tasks array 
    tasks.push(task);

    // Add to the localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Task Confirmation
    // alert('Task Saved');
}

// Remove task fn
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();

            // Remove from LS (li)
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Clear Tasks
function clearTasks() {
    // taskList.innerHTML = '';
    
    // Another way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // look this link up => https://jsperf.com/innerhtml-vs-removechild
}

// Clear All from LS
function clearAllTasks() {
    // while(taskList)
    console.log(taskList)
    console.log(`Task List: ${JSON.stringify(taskList)}`);

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    localStorage.removeItem('tasks');
    console.log(tasks)
}

// Filter Tasks
function filterTasks(e) {
    
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {

            task.style.display = 'block';

        } else {
            task.style.display = 'none';
        }
    });

    // Work on this later
    // let li = document.querySelector('.collection-item');

    // console.log( e.target.value.toLowerCase())

    // if(text == li.textContent.toLowerCase() ){
    //     li.style.display = 'block';
    // } else {
    //     li.style.display = 'none';
    // }
}