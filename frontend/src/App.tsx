import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    <div className="App">
      <Header />
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleCompleted={toggleCompleted}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;
