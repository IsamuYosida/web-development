import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function TaskDetail({ tasks }) {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundInMemory = tasks.find((t) => t.id === Number(id));

    if (foundInMemory) {
      setTask(foundInMemory);
      setLoading(false);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Задача не найдена");
          return res.json();
        })
        .then((data) => {
          setTask({ ...data, description: "" });
          setLoading(false);
        })
        .catch(() => {
          setTask(null);
          setLoading(false);
        });
    }
  }, [id, tasks]);

  if (loading) {
    return (
      <div className="card">
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <>
        <div className="detail-header">
          <h1>Задача не найдена</h1>
        </div>
        <div className="card">
          <p>Такой задачи не существует</p>
          <Link to="/">
            <button>← Назад к списку</button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="detail-header">
        <h1>Детали задачи</h1>
      </div>

      <div className="card">
        <p>
          <strong>ID:</strong> {task.id}
        </p>
        <p>
          <strong>Название:</strong> {task.title}
        </p>
        <p>
          <strong>Статус:</strong>{" "}
          {task.completed ? "✅ Выполнено" : "⬜ Не выполнено"}
        </p>
        {task.description ? (
          <p>
            <strong>Описание:</strong> {task.description}
          </p>
        ) : (
          <p>
            <em>Описание отсутствует</em>
          </p>
        )}
        <Link to="/">
          <button style={{ marginTop: "10px" }}>← Назад к списку</button>
        </Link>
      </div>
    </>
  );
}

export default TaskDetail;