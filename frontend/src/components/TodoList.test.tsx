import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import TodoList from './TodoList';

const todos = [
  { id: 1, description: 'Task 1', completed: false },
  { id: 2, description: 'Task 2', completed: true },
];

describe('TodoList', () => {
  test('renders the tabs, search input, and list', () => {
    render(
      <TodoList
        todos={todos}
        toggleCompleted={() => {}}
        deleteTodo={() => {}}
        deleteAllTodos={() => {}}
      />
    );

    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Delete all tasks')).toBeInTheDocument();
  });

  test('displays uncompleted todos by default', () => {
    render(
      <TodoList
        todos={todos}
        toggleCompleted={() => {}}
        deleteTodo={() => {}}
        deleteAllTodos={() => {}}
      />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
  });

  test('displays completed todos when the "Done" tab is clicked', () => {
    render(
      <TodoList
        todos={todos}
        toggleCompleted={() => {}}
        deleteTodo={() => {}}
        deleteAllTodos={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Done'));
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
