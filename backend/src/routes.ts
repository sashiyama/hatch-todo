import express from 'express';
import todoModel from './models/todo';

const router = express.Router();

router.get('/todos', async (_req, res) => {
  try {
    const todos = await todoModel.getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

router.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await todoModel.createTodo(description);
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
});

router.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    const updatedTodo = await todoModel.updateTodo(Number(id), description, completed);
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
});


router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rowCount = await todoModel.deleteTodo(Number(id));
    res.json({ rowCount });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

export default router;
