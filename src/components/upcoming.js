import React, { useState, useEffect } from 'react';
import TaskItem from './taskItem';
import '../styles/upcoming.css';

export default function Upcoming() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/tasks')
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setTasks([...data]);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleDeleteTask = (taskId) => {
    console.log('Deleting task:', taskId); 
    // Send a DELETE request to remove the task from the database
    fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete task');
        }
        // Remove the deleted task from the "Upcoming" section
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        console.log('Task deleted:', taskId); 
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleCompleteTask = (taskId) => {
    console.log('Completing task:', taskId); // Check if this log appears in the console
    // Send a PATCH request to mark the task as completed
    fetch(`http://localhost:8000/tasks/${taskId}/toggle`, {
      method: 'PATCH',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to mark task as complete');
        }
        // Remove the completed task from the "Upcoming" section
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        console.log('Task marked as complete:', taskId); // Check if this log appears in the console
      })
      .catch((error) => {
        setError(error);
      });
  };

  const upcomingTasks = tasks.filter((task) => !task.completed);


  return (
    <div className="upcoming">
      <div className="upcoming__header">
        <h1 className="upcoming__title">Upcoming Tasks</h1>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="upcoming__tasks">
          {upcomingTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onComplete={() => handleCompleteTask(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
