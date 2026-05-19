import React, { useEffect, useState } from "react"; //импортируем необходимые хуки для хранения данных и выполнения побочных эффектов (поиск)
import { useParams, Link } from "react-router-dom";

function TaskDetail({ tasks }) { //компонент для отображения деталей задачи, принимает список задач из родительского компонента
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundInMemory = tasks.find((t) => t.id === Number(id)); //попытка найти задачу в переданном списке задач по id, который получаем из параметров маршрута

    if (foundInMemory) {
      setTask(foundInMemory);
      setLoading(false);
    } else { //если задача не найдена в памяти, выполняем запрос к API для получения данных о задаче по id
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((res) => { //проверяем успешность ответа от сервера, если статус не в диапазоне 200-299, выбрасываем ошибку
          if (!res.ok) throw new Error("Задача не найдена");
          return res.json();
        })
        .then((data) => { //если данные успешно получены, сохраняем их в состоянии task, добавляя пустое описание, так как API не предоставляет его, и устанавливаем loading в false
          setTask({ ...data, description: "" });
          setLoading(false);
        }) //если возникает ошибка (например, задача не найдена), устанавливаем task в null и loading в false, чтобы отобразить сообщение об ошибке пользователю
        .catch(() => {
          setTask(null);
          setLoading(false);
        });
    }
  }, [id, tasks]); //useEffect нужно запустить заново, если изменится id (например, пользователь перешел с /task/1 на /task/2) или если изменится массив tasks (например, пользователь удалил задачу на главной странице).

  if (loading) { //если данные все еще загружаются, отображаем сообщение о загрузке
    return (
      <div className="card">
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!task) { //если задача не найдена (task равно null), отображаем сообщение об ошибке и кнопку для возврата к списку задач
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
//если задача успешно загружена, отображаем ее детали, включая id, название, статус выполнения и описание (если оно есть), а также кнопку для возврата к списку задач
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