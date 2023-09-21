import '../styles/sidebar.css';
import 'font-awesome/css/font-awesome.min.css';
import logo from '../assets/Logo-removebg-preview.png';
import { useState } from 'react';
export default function Sidebar() {
    const[search, setSearch] = useState('');


    const handelSearchInput = (e) => {
        setSearch(e.target.value);
    }
    const handelSearch = () => {
        console.log(search);
    }

    return(
    <div className= "sidebar" >
        <div className="sidebar__header">
           <h1 className="sidebar__title" >Menu</h1>
           <img src={logo} alt="logo" className="sidebar__logo" />
        </div>
        <div className='sidebar__search'>
            <div className="sidebar__searchContainer">
               <i className="fa fa-search" aria-hidden="true"></i>
                <input type="text" placeholder="Search..." onChange={handelSearchInput} />
                <button type="submit" onClick={handelSearch}>Search</button>
            </div>
        </div>
        <div className="sidebar__menu">
            <span>TASKS</span>
            <div className="sidebar__link">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <a >Upcoming </a>
            </div>
            <div className="sidebar__link">
                <i className="fa fa-calendar-check-o"></i>
                <a >Today </a>
            </div>
            <div className="sidebar__link">
                <i className="fa fa-sticky-note" aria-hidden='true'></i>
                <a >Sticky Wall </a>
            </div>
        </div>
    </div>
            )}