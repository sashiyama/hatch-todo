import React, { useState } from 'react';
import { useTransition } from 'react-spring';
import styled from 'styled-components';
import TodoItem from './TodoItem';

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
  const [activeTab, setActiveTab] = useState('undone');

  const sortedTodos = todos.slice().sort((a, b) => a.description.localeCompare(b.description));
  const completedTodos = sortedTodos.filter((todo) => todo.completed);
  const uncompletedTodos = sortedTodos.filter((todo) => !todo.completed);

  const completedTransitions = useTransition(completedTodos, {
    from: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
    keys: completedTodos.map((item) => item.id),
  });

  const uncompletedTransitions = useTransition(uncompletedTodos, {
    from: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
    keys: uncompletedTodos.map((item) => item.id),
  });

  return (
    <Body>
      <TabContainer>
        <Tab
          isActive={activeTab === 'undone'}
          onClick={() => setActiveTab('undone')}
        >
          To Do
        </Tab>
        <Tab
          isActive={activeTab === 'done'}
          onClick={() => setActiveTab('done')}
        >
          Done
        </Tab>
      </TabContainer>
      {activeTab === 'undone' && (
        <List>
          {uncompletedTransitions((style, todo) => (
            <TodoItem
              style={style}
              key={todo.id}
              todo={todo}
              toggleCompleted={toggleCompleted}
              deleteTodo={deleteTodo}
            />
          ))}
        </List>
      )}
      {activeTab === 'done' && (
        <List>
          {completedTransitions((style, todo) => (
            <TodoItem
              style={style}
              key={todo.id}
              todo={todo}
              toggleCompleted={toggleCompleted}
              deleteTodo={deleteTodo}
            />
          ))}
        </List>
      )}
    </Body>
  );
};

const Body = styled.div`
  width: 100%;
`;

const TabContainer = styled.div`
  display: flex;
`;

const Tab = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 1rem;
  font-size: 1.2rem;
  background-color: ${({ isActive }) => (isActive ? '#1e88e5' : '#ffffff')};
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#1e88e5')};
  border: 1px solid #1e88e5;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#1e88e5' : '#e3f2fd')};
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

export default TodoList;
