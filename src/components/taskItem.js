import '../styles/taskitem.css';
import { useState } from 'react';

export default function TaskItem({ task,onDelete  }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);


  const toggleTaskCompletion = async (taskId) => {
    try{
      const response = await fetch(`http://localhost:8000/tasks/${taskId}/toggle`, {
        method: 'PATCH',
      })

      if (!response.ok){
        throw new Error('Failed to toggle task completion');
      }
      const data = await response.json();
      setIsCompleted(data.completed);
    }catch(error){
      console.error(error);
    }
  }

    const handelDelete = () => {
        fetch(`http://localhost:8000/tasks/${task.id}`, {
            method: 'DELETE',
        })
            .then(() => {
                onDelete(task.id);
            });
    }
  return (
    <div className={`upcoming__task ${isCompleted ? 'completed' : ''}`}>
      <div className="upcoming__taskContainer" onClick={() => toggleTaskCompletion(task.id)}>
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

