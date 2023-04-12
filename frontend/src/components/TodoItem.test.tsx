import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import TodoItem from './TodoItem';

const todo = {
  id: 1,
  description: 'Test task',
  completed: false,
};

describe('TodoItem', () => {
  test('renders the todo item', () => {
    render(
      <TodoItem
        todo={todo}
        style={{}}
        toggleCompleted={() => {}}
        deleteTodo={() => {}}
      />
    );

    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  test('calls toggleCompleted and deleteTodo functions with todo id', () => {
    const toggleCompleted = jest.fn();
    const deleteTodo = jest.fn();
    render(
      <TodoItem
        todo={todo}
        style={{}}
        toggleCompleted={toggleCompleted}
        deleteTodo={deleteTodo}
      />
    );

    fireEvent.click(screen.getByRole("checkbox", { name: "Complete task" }));
    fireEvent.click(screen.getByText('Delete'));

    expect(toggleCompleted).toHaveBeenCalledWith(todo.id);
    expect(deleteTodo).toHaveBeenCalledWith(todo.id);
  });
});
