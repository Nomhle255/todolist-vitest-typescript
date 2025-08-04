import React from "react"; // optional with new JSX transform
import type { Todo } from "../types/todo";

export type TodoListProps = {
  todos: Todo[];
  toodleCheckbox: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toodleCheckbox,
  onDelete,
}) => {
  if (todos.length === 0) {
    return <p>No todos available.</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todos.completed}
              onChange={() => toodleCheckbox(todo.id)}
              aria-label={todo.title}
            />
            {todo.title}
          </label>
          <button aria-label={`Delete ${todo.title}`} onClick={() => onDelete(todo.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
