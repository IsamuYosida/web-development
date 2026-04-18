let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong style="text-decoration: ${task.done ? 'line-through' : 'none'}">
        ${task.title}
      </strong>
      <p>${task.description || ""}</p>
      <button onclick="toggleTask(${index})">
        ${task.done ? "Отменить" : "Сделано"}
      </button>
      <button onclick="deleteTask(${index})">Удалить</button>
    `;

    list.appendChild(li);
  });
}

function addTask() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title) {
    alert("Введите название!");
    return;
  }

  tasks.push({
    title,
    description,
    done: false
  });

  saveTasks();
  renderTasks();

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

// при загрузке страницы
renderTasks();