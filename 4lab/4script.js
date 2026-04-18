let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() { 
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => { //для списка
    const li = document.createElement("li");
//чтобы html как-то обозначал сделаное задание +кнопочки 
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
//получение текста из полей ввода
function addTask() { 
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  //проверка на пустой заголовок
  if (!title) {
    alert("Введите название!");
    return;
  }
//добавление задачи в массив (объекты новой задачи)
  tasks.push({
    title,
    description,
    done: false
  });

  saveTasks();
  renderTasks();
//очистка полей ввода 
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
}
//Функция для удаления задачи по индексу. Передаем в нее индекс задачи.
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}
//Перекоючение задачи выполненной/не выполненной. Передаем в нее индекс задачи, смотрим на ее свойство done и меняем его на противоположное.
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}Ы

// при загрузке страницы
renderTasks();