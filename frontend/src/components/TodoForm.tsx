import React, { useState } from 'react';
import styled from 'styled-components';

interface TodoFormProps {
  addTodo: (description: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    addTodo(description);
    setDescription('');
  };

  return (
    <Form onSubmit={handleSubmit}>  <Input
        type="text"
        placeholder="Add a new task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <AddButton type="submit">Add</AddButton>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  width: 100%;
  padding: 1rem;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AddButton = styled.button`
  background-color: #4c4c4c;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border: none;
  border-radius: 4px;p
  cursor: pointer;

  &:hover {
    background-color: #3a3a3a;
  }
`;

export default TodoForm;
