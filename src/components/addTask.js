import React, { useState } from 'react';
import '../styles/addtasks.css';

export default function AddTask() {
  const [newTask, setNewTask] = useState({ title: '', description: '', date: '', priority: 'low', completed: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

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
    setIsSubmitting(true);
    handleAddTask();
  };

  return (

            <div className="add-task-form">
        <h1 className="add-task-form__title">Add Task</h1>
           <form onSubmit={addTask} className="add-task-form">
          <div className="form-row">
            <div className="form-item">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newTask.date}
                  onChange={(e) =>
                    setNewTask({ ...newTask, date: e.target.value })
                  }
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
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  required
                  className="form-input"
                  maxLength={200}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select
                  id="priority"
                  name="priority"
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.target.value })
                  }
                  required
                  className="form-input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          <button type='submit' className="add-task-button" disabled={isSubmitting}>
    {isSubmitting ? 'Adding Task...' : 'Add Task'}
  </button>
  {error && <div className="error-message">{error.message}</div>}
  

        </form>
    </div>
    );
}