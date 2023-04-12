import pool from '../db';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

const getAllTodos = async (): Promise<Todo[]> => {
  const result = await pool.query(getTodosQuery);
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

const deleteAllTodos = async (): Promise<number> => {
  const result = await pool.query('DELETE FROM todos');
  return result.rowCount;
};

const getTodosQuery = `
(
    SELECT *
    FROM todos
    WHERE completed = false
)
UNION ALL
(
    SELECT *
    FROM todos
    WHERE completed = true
    ORDER BY updated_at DESC
    LIMIT 10
)
ORDER BY completed ASC, updated_at DESC;
`

export default {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
};
