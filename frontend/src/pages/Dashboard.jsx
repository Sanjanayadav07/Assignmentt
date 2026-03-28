import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import api from '../services/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = () => {
    fetchTasks();
    setEditingTask(null);
  };

  const handleEditTask = async (task) => {
    setEditingTask(task);
  };

  const handleRefresh = () => {
    fetchTasks();
  };

  if (loading) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <h3>Loading your tasks...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="page-title">📊 Dashboard</h1>
        <p style={{ color: '#666', fontSize: '1.2rem' }}>
          Manage your crypto trading tasks efficiently
        </p>
      </div>

      <TaskForm onTaskAdded={handleTaskAdded} editingTask={editingTask} />

      <TaskList 
        tasks={tasks} 
        onRefresh={handleRefresh}
        onEdit={handleEditTask}
      />
    </div>
  );
};

export default Dashboard;