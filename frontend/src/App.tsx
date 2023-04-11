import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await axios.get('/todos');
    setTodos(data);
  };

  const addTodo = async (description: string) => {
    const { data } = await axios.post('/todos', { description });
    setTodos([...todos, data]);
  };

  const toggleCompleted = async (id: number) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    const { data } = await axios.put(`/todos/${id}`, updatedTodo);
    setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
        />
      </AppContainer>
    </>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

export default App;
