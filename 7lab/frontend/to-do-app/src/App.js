// src/App.js

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import "./style.css";

import TaskDetail from "./TaskDetail";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API = "http://localhost:8080/todos";

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {

    try {

      const response = await axios.get(API);

      setTasks(response.data);

    } catch (error) {

      console.error(error);

    }
  }

  async function addTask() {

    if (!title.trim()) return;

    try {

      await axios.post(API, {
        title: title,
        description: description,
        completed: false,
      });

      fetchTasks();

      setTitle("");
      setDescription("");

    } catch (error) {

      console.error(error);

    }
  }

  async function deleteTask(id) {

    try {

      await axios.delete(`${API}/${id}`);

      fetchTasks();

    } catch (error) {

      console.error(error);

    }
  }

  async function toggleTask(id) {

    try {

      const task = tasks.find((t) => t.id === id);

      await axios.put(`${API}/${id}`, {
        ...task,
        completed: !task.completed,
      });

      fetchTasks();

    } catch (error) {

      console.error(error);

    }
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

          <Route
            path="/task/:id"
            element={<TaskDetail tasks={tasks} />}
          />

        </Routes>

      </div>
    </>
  );
}

export default App;