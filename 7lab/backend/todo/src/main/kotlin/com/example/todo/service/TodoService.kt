package com.example.todo.service

import com.example.todo.model.Todo
import com.example.todo.repository.TodoRepository
import org.springframework.stereotype.Service

@Service
class TodoService(
    private val todoRepository: TodoRepository
) {

    fun getAll(): List<Todo> {
        return todoRepository.findAll()
    }

    fun getById(id: Long): Todo {
        return todoRepository.findById(id).orElseThrow()
    }

    fun create(todo: Todo): Todo {
        return todoRepository.save(todo)
    }

    fun update(id: Long, updatedTodo: Todo): Todo {

        val todo = todoRepository.findById(id).orElseThrow()

        todo.title = updatedTodo.title
        todo.completed = updatedTodo.completed
        todo.description = updatedTodo.description

        return todoRepository.save(todo)
    }

    fun delete(id: Long) {
        todoRepository.deleteById(id)
    }
}