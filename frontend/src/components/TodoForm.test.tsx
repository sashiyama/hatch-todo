import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import TodoForm from "./TodoForm";

test("renders the input and add button", () => {
  const addTodoMock = jest.fn();
  render(<TodoForm addTodo={addTodoMock} />);
  const inputElement = screen.getByPlaceholderText("Add a new task");
  const addButtonElement = screen.getByText("Add");

  expect(inputElement).toBeInTheDocument();
  expect(addButtonElement).toBeInTheDocument();
});
