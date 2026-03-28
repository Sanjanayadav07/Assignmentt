const Task = require('../models/Task');
const asyncHandler = require('../utils/asyncHandler');
const { validationResult } = require('express-validator');

const getTasks = asyncHandler(async (req, res) => {
  const tasks = req.user.role === 'admin'
    ? await Task.find().populate('user', 'email role').sort({ createdAt: -1 })
    : await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({ success: true, data: tasks });
});

const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.status(200).json({ success: true, data: task });
});

const createTask = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;
  const task = await Task.create(req.body);

  res.status(201).json({ success: true, data: task });
});

const updateTask = asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task || (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({ success: true, data: task });
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await task.deleteOne();

  res.status(200).json({ success: true, message: 'Task deleted' });
});

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};