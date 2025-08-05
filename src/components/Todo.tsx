// src/components/Todo.tsx
import React, { useState } from "react";
import TodoList from "./TodoList";
import mockData from "../mockData";
import type { Todo } from "../types/todo";

function Todo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([...mockData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      userId: "1",
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setText("");
  };

  function handleToggleComplete(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDelete(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Todo Application</h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Add new todo here"
          placeholder="Add new todo here"
        />
        <button type="submit">Add Todo</button>
      </div>
      <TodoList
        todos={todos}
        toggleCheckbox={handleToggleComplete}
        onDelete={handleDelete}
      />
    </form>
  );
}

export default Todo;
