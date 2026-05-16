import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./style.css";
import TaskDetail from "./TaskDetail";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => res.json())
      .then((data) => {
        const tasksWithDesc = data.map((task) => ({
          ...task,
          description: "",
        }));
        setTasks(tasksWithDesc);
      });
  }, []);

  function addTask() {
    if (!title.trim()) return; //нельзя добавить задачу без названия

    const newTask = {
      id: Date.now(), //уникальный id на основе текущего времени
      title: title,
      description: description,
      completed: false, 
    };

    setTasks([newTask, ...tasks]);  //для обновления списка задач, добавляем новую задачу в начало массива
    setTitle(""); //очищаем поля ввода
    setDescription("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id)); //пересоздаем массив задач, исключая удаленную задачу по id
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  } //создаем новый массив задач, где для задачи с совпадающим id меняем статус completed на противоположный, а для остальных оставляем без изменений

  return ( //возвращаем разметку приложения, включая маршрутизацию для главной страницы и страницы деталей задачи
    <>
      <div className="header">
        <div className="header-content">
          <h1>ToDo List</h1>
        </div>
      </div>

      <div className="container">
        <Routes>
          <Route //определяем маршрут для главной страницы, который отображает список задач и форму для добавления новой задачи
            path="/" //главная страница, отображающая список задач и форму для добавления новой задачи
            element={ 
              <>
                <div className="card">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название задачи"
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание (необязательно)"
                  />
                  <button onClick={addTask}>Добавить</button>
                </div>

                <div className="card"> 
                  {tasks.length === 0 && <p>Загрузка задач...</p>} 
                  {tasks.map((task) => (//для каждой задачи создаем элемент с чекбоксом, названием и кнопкой удаления, а также отображаем описание, если оно есть
                    <div key={task.id} className="task"> 
                      <div className="task-top">
                        <div className="task-left">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                          />
                          <Link //ссылка на страницу деталей задачи, которая отображает подробную информацию о задаче при клике на ее название
                            to={`/task/${task.id}`}
                            className="task-title-link"
                          >
                            <span //название задачи, которое отображается с зачеркнутым стилем, если задача выполнена
                              className={`task-title ${
                                task.completed ? "done" : ""
                              }`}
                            >
                              {task.title}
                            </span>
                          </Link>
                        </div>
                        <button onClick={() => deleteTask(task.id)}>
                          Удалить
                        </button>
                      </div>
                      {task.description && (
                        <div className="task-desc">{task.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            }
          /> 
          <Route path="/task/:id" element={<TaskDetail tasks={tasks} />} /> 
        </Routes> 
      </div> 
    </>
  );
}

export default App;