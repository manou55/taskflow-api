const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Create task
router.post('/', async (req, res) => {
  try {
    const { title, description, teamId, priority, dueDate } = req.body;
    const userId = req.user.id;

    if (!title || !teamId) {
      return res.status(400).json({ error: 'Title and teamId required' });
    }

    const task = await Task.create({
      title,
      description,
      userId,
      teamId,
      priority: priority || 'medium',
      dueDate
    });

    res.status(201).json({ message: 'Task created', task });
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Get team tasks
router.get('/team/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;
    const tasks = await Task.getByTeam(teamId);
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get task by ID
router.get('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.getById(taskId);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Update task
router.put('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const updatedTask = await Task.update(taskId, {
      title,
      description,
      status,
      priority,
      dueDate
    });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task updated', task: updatedTask });
  } catch (error) {
    console.error('Task update error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
router.delete('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.delete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Task deletion error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Assign task to user
router.post('/:taskId/assign/:userId', async (req, res) => {
  try {
    const { taskId, userId } = req.params;
    const updatedTask = await Task.assignUser(taskId, userId);

    res.json({ message: 'Task assigned', task: updatedTask });
  } catch (error) {
    console.error('Task assignment error:', error);
    res.status(500).json({ error: 'Failed to assign task' });
  }
});

module.exports = router;