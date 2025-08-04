import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "../components/Todo";

describe("Todo component", () => {
  it("adds a new todo when submitted", async () => {
    render(<Todo />);
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(/Add new todo here/i);
    const button = screen.getByRole("button", { name: /add todo/i });

    await user.type(input, "Learn TypeScript");
    await user.click(button);

    // wait for the new todo to appear
    const newTodo = await screen.findByText(/Learn TypeScript/i);
    expect(newTodo).toBeInTheDocument();
  });
});
