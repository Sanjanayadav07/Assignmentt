import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import api from '../services/api';
import { toast } from 'react-toastify';

const TaskList = ({ tasks, onRefresh, onEdit }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        toast.success('Task deleted successfully!');
        onRefresh();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in-progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return 'status-pending';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <h3>📭 No tasks yet</h3>
          <p>Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3>📋 Your Tasks ({tasks.length})</h3>
        <button 
          onClick={onRefresh} 
          className="btn btn-secondary btn-sm"
          style={{ padding: '8px 16px' }}
        >
          🔄 Refresh
        </button>
      </div>
      
      <div className="grid">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-header">
              <div>
                <h4 className="task-title">{task.title}</h4>
                <span className={`status-badge ${getStatusClass(task.status)}`}>
                  {getStatusText(task.status)}
                </span>
              </div>
              <div className="task-date">
                {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            
            <div className="task-actions">
              <button 
                onClick={() => onEdit(task)}
                className="btn btn-sm btn-secondary"
                title="Edit Task"
              >
                <FiEdit3 /> Edit
              </button>
              <button 
                onClick={() => handleDelete(task._id)}
                className="btn btn-sm btn-danger"
                title="Delete Task"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;