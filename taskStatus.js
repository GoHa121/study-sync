// File: server/routes/taskStatus.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Cập nhật trạng thái nhiệm vụ (ví dụ: hoàn thành)
router.put('/:taskId/status', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = req.body.status; // status có thể là 'completed', 'in-progress', 'pending'
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task status' });
  }
});

module.exports = router;
