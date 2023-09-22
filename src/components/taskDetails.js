import React, { useEffect, useState } from 'react';

export default function TaskDetails({ match }) {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const taskId = match.params.id; // Extract the task ID from the URL
    // Fetch the task details by its ID
    fetch(`http://localhost:8000/tasks/${taskId}`)
      .then((res) => res.json())
      .then((data) => {
        setTask(data);
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
      });
  }, [match.params.id]);

  return (
    <div>
      {task ? (
        <div>
          <h1>{task.title}</h1>
          <p>Description: {task.description}</p>
          <p>Date: {task.date}</p>
            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
            <button onClick={()=>setTask({})}>Delete</button><br/>
            <button onClick={()=>setTask({})}>Edit</button>
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
}