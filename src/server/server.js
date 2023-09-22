const express = require('express');
const cors = require('cors');
const { validationResult } = require('express-validator');
const { check } = require('express-validator');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

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

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

// Get all tasks
app.get('/tasks', (req, res) => {
  const {sortByDate}=req.query;
  let taskToReturn =[...tasks];
  if (sortByDate){
    taskToReturn.sort((a,b)=>new Date(a.date)- new Date(b.date));
  }
  res.json(taskToReturn);
});

// Create a new task
app.post('/tasks',[
  check('title').isLength({ min: 1 }).withMessage('Title is required'),
  check('description').isLength({ min: 1 }).withMessage('Description is required'),
  check('date').isLength({ min: 1 }).withMessage('Date is required'),
  check('priority').isLength({ min: 1 }).withMessage('Priority is required'),
  ],
 (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  res.status(201).json(newTask);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

});

// Update a task
app.put('/tasks/:id',[
  check('title').isLength({ min: 1 }).withMessage('Title is required'),
  check('description').isLength({ min: 1 }).withMessage('Description is required'),
  check('date').isLength({ min: 1 }).withMessage('Date is required'),
  check('priority').isLength({ min: 1 }).withMessage('Priority is required'),
], (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    throw new NotFoundError('Task not found');
  } else {
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
  }
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(204).send();
});

app.patch('/tasks/:id/toggle',(req,res)=>{
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    throw new NotFoundError('Task not found');
  } else {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    res.json(tasks[taskIndex]);
  }
  res.status(200).json({ message: 'Task toggled successfully' });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
