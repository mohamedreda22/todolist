const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Sample tasks data (replace with a database or actual data source)
let tasks = [
  {
    id: 1,
    title: ' Task 1',
    description: 'This is a sample task.',
    date: '2023-09-21',
    priority: 'low',
    completed: false,
  },
  {
    id: 2,
    title: ' Task 2',
    description: 'Another sample task.',
    date: '2023-09-22',
    priority: 'high',
    completed: true,
  },
];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
