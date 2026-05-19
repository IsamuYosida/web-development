// src/components/TodoItem.js
import React from "react";
import { Link } from "react-router-dom";

function TodoItem({ task, onToggle, onDelete }) {
  return (
    <div className="task">
      <div className="task-top">
        <div className="task-left">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <Link to={`/task/${task.id}`} className="task-title-link">
            <span className={`task-title ${task.completed ? "done" : ""}`}>
              {task.title}
            </span>
          </Link>
        </div>
        <button onClick={() => onDelete(task.id)}>Удалить</button>
      </div>
      {task.description && (
        <div className="task-desc">{task.description}</div>
      )}
    </div>
  );
}

export default TodoItem;