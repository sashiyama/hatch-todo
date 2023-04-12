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
  deleteAllTodos: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleCompleted, deleteTodo, deleteAllTodos }) => {
  const [activeTab, setActiveTab] = useState('undone');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const sortedTodos = todos
    .filter((todo) =>
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.description.localeCompare(b.description));

  const completedTodos = sortedTodos.filter((todo) => todo.completed);
  const uncompletedTodos = sortedTodos.filter((todo) => !todo.completed);

  const handleDeleteAllTodos = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      deleteAllTodos();
    }
  };

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
      <ButtonContainer>
        <DeleteAllTodosButton type="button" onClick={handleDeleteAllTodos}>
          Delete all tasks
        </DeleteAllTodosButton>
      </ButtonContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchContainer>
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

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #cccccc;
  border-radius: 4px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #1e88e5;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: #757575;
  }
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const DeleteAllTodosButton = styled.button`
  background-color: #f5f5f5;
  color: #757575;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  margin-top: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: #e0e0e0;
    color: #424242;
  }
`;

export default TodoList;
