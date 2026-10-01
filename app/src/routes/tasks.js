const express = require('express');
const db = require('../db');

const router = express.Router();

// POST /api/tasks - Create a task
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'title is required' });
    }

    const task = await db.createTask({
      title: title.trim(),
      description: typeof description === 'string' ? description.trim() : '',
    });

    return res.status(201).json(task);
  } catch (err) {
    console.error('Failed to create task:', err);
    return res.status(500).json({ error: 'Failed to create task' });
  }
});

// GET /api/tasks - Get all tasks
router.get('/', async (_req, res) => {
  try {
    const tasks = await db.getAllTasks();
    return res.json(tasks);
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await db.deleteTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.json({ message: 'Task deleted', task });
  } catch (err) {
    console.error('Failed to delete task:', err);
    return res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
