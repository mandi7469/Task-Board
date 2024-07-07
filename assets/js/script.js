// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const addTask = document.querySelector("#addTask");
const todoColumn = document.querySelector("#todoColumn");
let entries = [];

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const id = crypto.randomUUID();
  return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  console.log(task);
  const taskCard = document.createElement("div");
  const taskTitle = document.createElement("h5");
  const cardBody = document.createElement("div");
  const taskDescription = document.createElement("p");
  const taskDueDate = document.createElement("p");
  const deleteButton = document.createElement("a");

  taskCard.setAttribute("id", task.id);
  taskCard.className = "card w-100";
  taskTitle.className = "card-header";
  cardBody.className = "card-body";
  taskDescription.className = "card-title";
  taskDueDate.className = "card-text";
  deleteButton.className = "btn btn-danger";

  taskTitle.textContent = task.taskTitle;
  taskDescription.textContent = task.taskDescription;
  taskDueDate.textContent = task.taskDueDate;
  deleteButton.textContent = "Delete";

  todoColumn.appendChild(taskCard);
  taskCard.appendChild(taskTitle);
  taskCard.appendChild(cardBody);
  cardBody.appendChild(taskDescription);
  cardBody.appendChild(taskDueDate);
  cardBody.appendChild(deleteButton);

  $(function () {
    $("#" + task.id).draggable();
  });
  deleteButton.addEventListener("click", function(){
    handleDeleteTask(task.id);
}, false);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  if (taskList !== null) {
    entries = entries.concat(taskList);

    if (entries.length > 0)
      for (let index = 0; index < entries.length; index++) {
        const task = entries[index];

        createTaskCard(task);
      }
  }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const task = {
    taskTitle: exampleFormControlInput1.value.trim(),
    taskDueDate: datepicker.value,
    taskDescription: exampleFormControlTextarea1.value.trim(),
    id: generateTaskId(),
  };

  entries.push(task);
  localStorage.setItem("tasks", JSON.stringify(entries));

  createTaskCard(task);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(id) {
  const element = document.getElementById(id);
  element.remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
addTask.addEventListener("click", handleAddTask);

$(function () {
  $("#datepicker").datepicker();
});


// $( ".card-body" ).droppable({
//   tolerance: "fit",
// });



renderTaskList();


