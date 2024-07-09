// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
//let nextId = JSON.parse(localStorage.getItem("nextId"));
const addTask = document.querySelector("#addTask");
let entries = [];

// Created a function to generate a unique task id
function generateTaskId() {
  const id = crypto.randomUUID();
  return id;
}

// Created a function to create a task card
function createTaskCard(task) {
  console.log(task);
  const taskCard = document.createElement("div");
  const taskTitle = document.createElement("h5");
  const cardBody = document.createElement("div");
  const taskDescription = document.createElement("p");
  const taskDueDate = document.createElement("p");
  const deleteButton = document.createElement("a");

  taskCard.setAttribute("data-project-id", task.id);
  taskCard.setAttribute("id", task.id);

  taskCard.className = "card w-100 m-2"
  taskTitle.className = "card-header";
  cardBody.className = "card-body";
  taskDescription.className = "card-title";
  taskDueDate.className = "card-text";
  deleteButton.className = "btn btn-danger";

  taskTitle.textContent = task.taskTitle;
  taskDescription.textContent = task.taskDescription;
  taskDueDate.textContent = task.taskDueDate;
  deleteButton.textContent = "Delete";

  taskCard.appendChild(taskTitle);
  taskCard.appendChild(cardBody);
  cardBody.appendChild(taskDescription);
  cardBody.appendChild(taskDueDate);
  cardBody.appendChild(deleteButton);


  const todoList = $('#todo-cards');
  const inProgressList = $('#in-progress-cards');
  const doneList = $('#done-cards');

  $(function () {
    $(".card").draggable({
      opacity: 0.7,
      zIndex: 100,
      helper: function (e) {
        // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
        const original = $(e.target).hasClass("ui-draggable")
          ? $(e.target)
          : $(e.target).closest(".ui-draggable");
        // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
        return original.clone().css({
          width: original.outerWidth(),
        });
      },
    });
  });

  deleteButton.addEventListener(
    "click",
    function () {
      handleDeleteTask(task.id);
    },
    false
  );

  if (task.taskDueDate && task.status !== "done") {
    const now = dayjs();
    const taskDueDate = dayjs(task.taskDueDate, "MM/DD/YYYY");

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, "day")) {
      taskCard.className = "card w-100 m-2 bg-warning text-white";
    } else if (now.isAfter(taskDueDate)) {
      taskCard.className = "card w-100 m-2 bg-danger text-white";
      deleteButton.className = "btn btn-danger border-light";
    }
  }

  if (task.status === 'to-do') {
    todoList.append(taskCard);
  } else if (task.status === 'in-progress') {
    inProgressList.append(taskCard);
  } else if (task.status === 'done') {
    doneList.append(taskCard);
  }


}

// Created a function to render the task list and make cards draggable
function renderTaskList() {
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();
  
    if (entries.length > 0)
      for (let index = 0; index < entries.length; index++) {
        const task = entries[index];

        createTaskCard(task);
      }


}

// Created a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const task = {
    taskTitle: exampleFormControlInput1.value.trim(),
    taskDueDate: datepicker.value,
    taskDescription: exampleFormControlTextarea1.value.trim(),
    id: generateTaskId(),
    status: "to-do",
  };

  entries.push(task);
  localStorage.setItem("tasks", JSON.stringify(entries));

  renderTaskList();
}

// Created a function to handle deleting a task
function handleDeleteTask(id) {
  const element = document.getElementById(id);
  element.remove();

  for (let index = 0; index < entries.length; index++) {
    const task = entries[index];

    if (task.id == id) {
      entries.splice(index, 1);
    }
  }
  localStorage.setItem("tasks", JSON.stringify(entries));
}

// Created a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.draggable[0].dataset.projectId;
  const newStatus = event.target.id;

  for (let entry of entries) {
    if (entry.id === taskId) {
      entry.status = newStatus;
    }
  }

  localStorage.setItem("tasks", JSON.stringify(entries));
  renderTaskList();
}

// When the page loads, the task list is rendered, event listeners added, lanes are droppable, and the due date field is a date picker
$(document).ready(function () {
  $(".lane").droppable({
    accept: ".card",
    drop: handleDrop,
  });

  $(function () {
    $("#datepicker").datepicker();
  });

  if (taskList !== null) {
    entries = entries.concat(taskList);
    renderTaskList();
  }


 
});

addTask.addEventListener("click", handleAddTask);
