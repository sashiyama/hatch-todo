import pool from '../db';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

const getAllTodos = async (): Promise<Todo[]> => {
  const result = await pool.query('SELECT * FROM todos');
  return result.rows;
};

const createTodo = async (description: string): Promise<Todo> => {
  const result = await pool.query('INSERT INTO todos (description) VALUES ($1) RETURNING *', [description]);
  return result.rows[0];
};

const updateTodo = async (id: number, description: string, completed: boolean): Promise<Todo> => {
  const result = await pool.query('UPDATE todos SET description = $1, completed = $2 WHERE id = $3 RETURNING *', [
    description,
    completed,
    id,
  ]);
  return result.rows[0];
};

const deleteTodo = async (id: number): Promise<number> => {
  const result = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
  return result.rowCount;
};

export default {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
