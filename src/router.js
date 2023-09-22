/* import { createBrowserRouter } from "react-router-dom";
import Upcoming from "./components/upcoming";
import AddTask from "./components/addTask";
import { App } from "react-bootstrap-icons";
import Sidebar from "./components/sidebar";

const router=createBrowserRouter([
    { 
        path: "/",
        element: <App/>,
        children:[
            { 
             path: "/upcoming",
             element: <><Sidebar/><Upcoming/></> 
            },
            { 
              path: "/addTask",
              element: <><Sidebar/><AddTask/></>
            },
            ]
    },
        ])

export default router; */