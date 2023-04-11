import React from 'react';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleCompleted: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleCompleted, deleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <>
        <input type="checkbox" checked={todo.completed} onChange={() => { toggleCompleted(todo.id) }} />
        <li key={todo.id}>{todo.description}</li>
        <button onClick={() => { deleteTodo(todo.id) }}>Delete</button>
        </>
      ))}
    </ul>
  );
};

export default TodoList;
