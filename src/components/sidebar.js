import '../styles/sidebar.css';
import 'font-awesome/css/font-awesome.min.css';
import logo from '../assets/Logo-removebg-preview.png';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


export default function Sidebar() {
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/tasks')
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setTasks([...data]);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  useEffect(() => {
    const lowerCaseSearch = search.toLowerCase();
    const filtered = tasks.filter((task) =>
    (task.title && task.title.toLowerCase().includes(lowerCaseSearch)) ||
    (task.description && task.description.toLowerCase().includes(lowerCaseSearch)) ||
    (task.date && task.date.includes(lowerCaseSearch))
  );
  
  
    
    setFilteredTasks(filtered);
  }, [search, tasks]);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__title">Menu</h1>
        <img src={logo} alt="logo" className="sidebar__logo" />
      </div>
      <div className='sidebar__search'>
        <div className="sidebar__searchContainer">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input type="text" placeholder="Search..." onChange={handleSearchInput} />
        </div>
      </div>
      <div className="sidebar__menu">
        <span>TASKS</span>
        <div className="sidebar__link">
          <i className="fa fa-plus" aria-hidden="true"></i>
          <Link to="/addTask">Add Task</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-calendar" aria-hidden="true"></i>
          <Link to="/upcoming">Upcoming</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-calendar-check-o"></i>
          <Link to="/completed">Completed Tasks</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-sticky-note" aria-hidden='true'></i>
          <Link to="/stickyWall">Sticky Wall</Link>
        </div>
      </div>
      <div className="sidebar__searchResults">
        <h3>Search Results</h3>
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <Link to={`/task/${task.id}`}>{task.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}