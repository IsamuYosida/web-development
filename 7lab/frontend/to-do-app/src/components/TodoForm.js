// src/components/TodoForm.js
import React from "react";

function TodoForm({ title, setTitle, description, setDescription, onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
  };

  return (
    <div className="card form-card">
      <h2 className="form-title">✨ Новая задача</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Что нужно сделать?"
            className="form-input title-input"
            autoFocus
          />
        </div>
        <div className="form-group">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Подробное описание (необязательно)..."
            className="form-input description-input"
            rows="3"
          />
        </div>
        <button type="submit" className="add-button">
          ➕ Добавить задачу
        </button>
      </form>
    </div>
  );
}

export default TodoForm;