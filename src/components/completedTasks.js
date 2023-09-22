import React, { useState, useEffect } from 'react';
import TaskItem from './taskItem';
import '../styles/completedtasks.css';

export default function CompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleCompleteTask = (taskId) => {
    fetch(`http://localhost:8000/tasks/${taskId}/toggle`, {
      method: 'PATCH',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to mark task as complete');
        }
        // Remove the completed task from the completedTasks state
        setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error('Error marking task as complete:', error);
      });
  };
  

  useEffect(() => {
    fetch('http://localhost:8000/tasks')
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        const completed = data.filter((task) => task.completed);
        setCompletedTasks(completed);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleDeleteTask = (taskId) => {
    fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete task');
        }
        setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="completed-tasks">
      <div className="completed-tasks__header">
        <h1 className="completed-tasks__title">Completed Tasks</h1>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="completed-tasks__list">
          {completedTasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} />
          ))}
        </div>
      )}
    </div>
  );
}
