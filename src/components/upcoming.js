import React, { useState, useEffect } from 'react';
import '../styles/upcoming.css';

function TaskItem({ task,onDelete }) {
    const handelDelete = () => {
        fetch(`http://localhost:8000/tasks/${task.id}`, {
            method: 'DELETE',
        })
            .then(() => {
                onDelete(task.id);
            });
    }
  return (
    <div className="upcoming__task">
      <div className="upcoming__taskContainer">
        <div className="upcoming__taskTitle">
          <h2>{task.title}</h2>
          <div className="upcoming__taskDate">
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <p>{task.date}</p>
          </div>
        </div>
        <div className="upcoming__taskDescription">
          <p>{task.description}</p>
        </div>
        <div className="upcoming__taskFooter">
          <div className="upcoming__taskStatus">
            <i className={`fa ${task.completed ? 'fa-check-circle' : 'fa-circle'}`} aria-hidden="true"></i>
            <p>{task.completed ? 'Completed' : 'Pending'}</p>
          </div>
          <div className="upcoming__taskPriority">
            <i className={`fa ${task.priority === 'high' ? 'fa-exclamation-circle' : 'fa-circle'}`} aria-hidden="true"></i>
            <p>{task.priority}</p>
          </div>
            <div className="upcoming__taskDelete">
                <i className="fa fa-trash" aria-hidden="true" onClick={handelDelete}></i>
                <button className="upcoming__delete" onClick={handelDelete}>
                    Delete
                </button>
                </div>

        </div>
      </div>
    </div>
  );
}

export default function Upcoming() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', date: '', priority: 'low', completed: false });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const[isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/tasks')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
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
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        setError(error);
      });
  };
  const handleAddTask = () => {
    setIsSubmitting(true);
    fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add task');
        }
        return res.json();
      })
      .then((data) => {
        setTasks([...tasks, data]);
        setNewTask({ title: '', description: '', date: '', priority: 'low', completed: false });
        setIsSubmitting(false);
        document.getElementById('title').focus();
    })
      .catch((error) => {
        setError(error);
        setIsSubmitting(false);
      });
  };

  const addTask = (e) => {
    e.preventDefault();
    handleAddTask();
  };

  return (
    <div className="upcoming">
      <div className="upcoming__header">
        <h1 className="upcoming__title">Upcoming</h1>
        </div>
        <form onSubmit={addTask} className="add-task-form">
  <div className="form-group">
    <label htmlFor="title">Title:</label>
    <input
      type="text"
      id="title"
      name="title"
      value={newTask.title}
      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      required
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="description">Description:</label>
    <textarea
      id="description"
      name="description"
      value={newTask.description}
      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      required
      className="form-input"
    ></textarea>
  </div>
  <div className="form-group">
    <label htmlFor="date">Date:</label>
    <input
      type="date"
      id="date"
      name="date"
      value={newTask.date}
      onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
      required
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="priority">Priority:</label>
    <select
      id="priority"
      name="priority"
      value={newTask.priority}
      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
      required
      className="form-input"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>
  <button type='submit' className="add-task-button" disabled={isSubmitting}>
    {isSubmitting ? 'Adding Task...' : 'Add Task'}
  </button>
</form>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="upcoming__tasks">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} />
          ))}
        </div>
      )}
    </div>
      );
}
