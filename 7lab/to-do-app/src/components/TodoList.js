// src/components/TodoList.js
import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="card">
        <p>Загрузка задач...</p>
      </div>
    );
  }

  return (
    <div className="card">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;