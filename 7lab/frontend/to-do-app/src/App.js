// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./style.css";
import TaskDetail from "./TaskDetail";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

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
                <TodoForm
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                  onAdd={addTask}
                />
                <TodoList
                  tasks={tasks}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
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