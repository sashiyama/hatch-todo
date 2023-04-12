import React from 'react';
import { animated } from 'react-spring';
import styled from 'styled-components';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  style: any;
  toggleCompleted: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, style, toggleCompleted, deleteTodo }) => {
  return (
    <AnimatedListItem style={style}>
      <Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleCompleted(todo.id)}
        aria-label="Complete task"
      />
      <Description completed={todo.completed}>{todo.description}</Description>
      <DeleteButton onClick={() => deleteTodo(todo.id)}>Delete</DeleteButton>
    </AnimatedListItem>
  );
};

const AnimatedListItem = animated(styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
`);

const Checkbox = styled.input`
  cursor: pointer;
`;

const Description = styled.span<{ completed: boolean }>`
  flex: 1;
  font-size: 1rem;
  padding: 0 1rem;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  opacity: ${({ completed }) => (completed ? 0.6 : 1)};
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: #fff;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #cc0000;
  }
`;

export default TodoItem;
