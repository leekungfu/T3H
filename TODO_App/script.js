let tasks = [];
let currentTab = "all";

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  reloadTasks(currentTab);
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    saveTasks();
    reloadTasks(currentTab);
  }
}

function reloadTasks(filter = "all") {
  currentTab = filter;
  const taskList = document.getElementById("task-list");
  const inputContainer = document.querySelector(".input-container");
  const deleteAllButton = document.querySelector("#delete-all");
  taskList.innerHTML = "";

  if (filter === "all" || filter === "active") {
    inputContainer.style.display = "flex";
    deleteAllButton.style.display = "none";
  } else {
    inputContainer.style.display = "none";
    deleteAllButton.style.display = "block";
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = task.completed ? "completed" : "";

    const taskContent = document.createElement("div");
    taskContent.className = "task-content";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${index}`;
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(index));

    const label = document.createElement("label");
    label.setAttribute("for", `task-${index}`);
    label.textContent = task.text;
    label.addEventListener("click", (event) => {
      event.preventDefault();
      toggleTask(index);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "del-btn";
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteTask(index);
    });

    taskContent.appendChild(checkbox);
    taskContent.appendChild(label);
    taskItem.appendChild(taskContent);

    if (filter === "completed") {
      taskItem.appendChild(deleteButton);
    }

    taskList.appendChild(taskItem);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  reloadTasks(currentTab);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  reloadTasks(currentTab);
}

function deleteAll() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  reloadTasks(currentTab);
}

function filterTasks(filter) {
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelector(`.tab[onclick="filterTasks('${filter}')"]`)
    .classList.add("active");
  reloadTasks(filter);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
