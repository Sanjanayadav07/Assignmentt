import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const TaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/tasks', formData);
      toast.success('Task created successfully!');
      setFormData({ title: '', description: '', status: 'pending' });
      onTaskAdded();
    } catch (error) {
      toast.error('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>➕ Create New Task</h3>
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter task title"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description (optional)"
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;