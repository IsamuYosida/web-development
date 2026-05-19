package com.example.todo.model

import jakarta.persistence.*

@Entity
@Table(name = "todos")
data class Todo(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    var title: String = "",

    var description: String = "",

    var completed: Boolean = false
)