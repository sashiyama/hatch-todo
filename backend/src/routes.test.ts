import request from 'supertest';
import express from 'express';
import routes from './routes';
import todoModel from './models/todo';

jest.mock('./models/todo');

const app = express();
app.use(express.json());
app.use(routes);

describe('routes', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('GET /todos', async () => {
    const mockTodos = [
      { id: 1, description: 'Test task 1', completed: false },
      { id: 2, description: 'Test task 2', completed: true },
    ];

    (todoModel.getAllTodos as jest.Mock).mockResolvedValue(mockTodos);

    const response = await request(app).get('/todos');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTodos);
  });

  test('POST /todos', async () => {
    const newTodo = { id: 3, description: 'New task', completed: false };

    (todoModel.createTodo as jest.Mock).mockResolvedValue(newTodo);

    const response = await request(app)
      .post('/todos')
      .send({ description: 'New task' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(newTodo);
  });

  test('PUT /todos/:id', async () => {
    const updatedTodo = { id: 1, description: 'Updated task', completed: true };

    (todoModel.updateTodo as jest.Mock).mockResolvedValue(updatedTodo);

    const response = await request(app)
      .put('/todos/1')
      .send({ description: 'Updated task', completed: true });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedTodo);
  });

  test('DELETE /todos/:id', async () => {
    (todoModel.deleteTodo as jest.Mock).mockResolvedValue(1);

    const response = await request(app).delete('/todos/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ rowCount: 1 });
  });

  test('DELETE /todos', async () => {
    (todoModel.deleteAllTodos as jest.Mock).mockResolvedValue(2);

    const response = await request(app).delete('/todos');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ rowCount: 2 });
  });
});
