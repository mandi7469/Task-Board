// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const addTask = document.querySelector("#addTask");
const todoColumn = document.querySelector("#todoColumn");
let entries = [];

if (taskList !== null) {
  entries = entries.concat(taskList);
}

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
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskForm = {
    taskTitle: exampleFormControlInput1.value.trim(),
    taskDueDate: datepicker.value,
    taskDescription: exampleFormControlTextarea1.value.trim(),
    id: generateTaskId(),
  };

  entries.push(taskForm);
  localStorage.setItem("tasks", JSON.stringify(entries));

  createTaskCard(taskForm);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
addTask.addEventListener("click", handleAddTask);

$(function () {
  $("#datepicker").datepicker();
});
