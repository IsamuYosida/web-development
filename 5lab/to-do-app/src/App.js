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
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
    setDescription("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <>
      <div className="header">
        <div className="header-content">
          <h1>ToDo List</h1>
        </div>
      </div>

      <div className="container">
        <Routes>
          <Route
            path="/"
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
                  {tasks.map((task) => (
                    <div key={task.id} className="task">
                      <div className="task-top">
                        <div className="task-left">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                          />
                          <Link
                            to={`/task/${task.id}`}
                            className="task-title-link"
                          >
                            <span
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