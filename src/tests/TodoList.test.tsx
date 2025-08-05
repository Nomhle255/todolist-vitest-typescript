import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import TodoList from "../components/TodoList";
import mockData from "../mockData";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import type { Todo } from "../types/todo";

// Wrapper to provide state + toggle logic like the real parent does
const StatefulWithDelete = () => {
  const [todos, setTodos] = useState<Todo[]>([...mockData]);
  const toggle = (id: string) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const remove = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));
  return <TodoList todos={todos} toggleCheckbox={toggle} onDelete={remove} />;
};

describe("TodoList component", () => {
  it("renders a todo with title 'Eat breakfast'", () => {
    render(
      <TodoList
        todos={mockData}
        toggleCheckbox={() => {}}
        onDelete={() => {}}
      />
    );
    expect(screen.getByText(/Eat breakfast/i)).toBeInTheDocument();
  });

  it("renders all provided todos", () => {
    render(
      <TodoList
        todos={mockData}
        toggleCheckbox={() => {}}
        onDelete={() => {}}
      />
    );
    mockData.forEach((t) => {
      expect(screen.getByText(new RegExp(t.title, "i"))).toBeInTheDocument();
    });
  });

  it("Change todo to completed", async () => {
    render(<StatefulWithDelete />);
    const user = userEvent.setup();

    const checkBox = await screen.findByRole("checkbox", {
      name: /Eat breakfast/i,
    });
    expect(checkBox).not.toBeChecked();

    await user.click(checkBox);
    expect(checkBox).toBeChecked();
  });

  it("delete a todo from list when delete button is clicked", async () => {
    render(<StatefulWithDelete />);

    const user = userEvent.setup();

    expect(screen.getByText(/Eat breakfast/i)).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", {
      name: /delete Eat breakfast/i,
    });
    await user.click(deleteButton);

    expect(screen.queryByText(/Eat breakfast/i)).not.toBeInTheDocument();
  });
});
