import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upcoming from "./components/upcoming";
import AddTask from "./components/addTask";
import Sidebar from "./components/sidebar";
import CompletedTasks from "./components/completedTasks";
import TaskDetails from './components/taskDetails'; 
import StickyWall from './components/stickyWall';

export default function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<><Sidebar /><Upcoming /></>} />
        <Route path="/upcoming" element={<><Sidebar /><Upcoming /></>} />
        <Route path="/addTask" element={<><Sidebar /><AddTask /></>} />
        <Route path="/completed" element={<><Sidebar /><CompletedTasks /></>} />
        <Route path="/task/:id" element={<><Sidebar /><TaskDetails/></>} />
        <Route path="/stickyWall" element={<><Sidebar /><StickyWall/></>}/>


      </Routes>
    </Router>
  );
}
