package com.example.todo.controller

import com.example.todo.model.Todo
import com.example.todo.service.TodoService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = ["http://localhost:3000"])
class TodoController(
    private val todoService: TodoService
) {

    @GetMapping
    fun getAll(): List<Todo> {
        return todoService.getAll()
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): Todo {
        return todoService.getById(id)
    }

    @PostMapping
    fun create(@RequestBody todo: Todo): Todo {
        return todoService.create(todo)
    }

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody todo: Todo
    ): Todo {
        return todoService.update(id, todo)
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) {
        todoService.delete(id)
    }
}