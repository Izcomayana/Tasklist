// Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all Event Listener
loadEventListener();

// Load all Event Listener
 
  function loadEventListener() {
     // DOM load event
      document.addEventListener('DOMContentLoaded', getTasks);   
  //Add Task Event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear Tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Get tasks from LS
  function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
      }

      tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement('li');
        // Add a class
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add a class
        link.className = 'delete-item secondary-content';
        // Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"</i>';
        // Append link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
      });
    }

//Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a Task');
  };

  // Create li element
  const li = document.createElement('li');
  // Add a class
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add a class
  link.className = 'delete-item secondary-content';
  // Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"</i>';
  // Append link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStroage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
};

// Store Task
function storeTaskInLocalStroage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks')); 
  }

  tasks.push(task);

  console.log(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      
      // Remove From LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  } 
};

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task
function clearTasks() {
// taskList.innerHTML = '';

  // Fastest
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear task from LS
function clearTasksFromLocalStorage() {
    localStorage.clear(); 
}

// Filter Task
function filterTasks(e) {
  const text = e.target.value;

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const items = task.firstChild.textContent;
      if(items.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
          task.style.display = 'none';
        }
  });
}