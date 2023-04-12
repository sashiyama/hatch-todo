import pool from '../db';
import todoModel from './todo';

jest.mock('../db', () => {
  return {
    query: jest.fn(),
  };
});

describe('todoModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllTodos', async () => {
    const mockTodos = [
      { id: 1, description: 'Test task 1', completed: false },
      { id: 2, description: 'Test task 2', completed: true },
    ];

    (pool.query as jest.Mock).mockResolvedValue({ rows: mockTodos });

    const todos = await todoModel.getAllTodos();

    expect(pool.query).toHaveBeenCalledWith(expect.any(String));
    expect(todos).toEqual(mockTodos);
  });

  test('createTodo', async () => {
    const newTodo = { id: 3, description: 'New task', completed: false };

    (pool.query as jest.Mock).mockResolvedValue({ rows: [newTodo] });

    const todo = await todoModel.createTodo('New task');

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['New task']);
    expect(todo).toEqual(newTodo);
  });

  test('updateTodo', async () => {
    const updatedTodo = { id: 1, description: 'Updated task', completed: true };

    (pool.query as jest.Mock).mockResolvedValue({ rows: [updatedTodo] });

    const todo = await todoModel.updateTodo(1, 'Updated task', true);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['Updated task', true, 1]);
    expect(todo).toEqual(updatedTodo);
  });

  test('deleteTodo', async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rowCount: 1 });

    const rowCount = await todoModel.deleteTodo(1);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), [1]);
    expect(rowCount).toEqual(1);
  });

  test('deleteAllTodos', async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rowCount: 2 });

    const rowCount = await todoModel.deleteAllTodos();

    expect(pool.query).toHaveBeenCalledWith(expect.any(String));
    expect(rowCount).toEqual(2);
  });
});
