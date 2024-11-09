import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route,} from "react-router-dom"
import User from './Component/User/User'
import Admin from './Component/Admin/Admin'
import Home from './Component/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './Component/Admin/Content/DashBoard';
import Food from './Component/Admin/Content/Food/ManagerFood';
import Exercise from './Component/Admin/Content/Exercise/ManagerExercise'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}> 
          <Route index element={<Home />} />  
          <Route path="Users" element={<User />} />  
        </Route>  
        <Route path="/Admins" element={<Admin/>} >
          <Route index element={<DashBoard />} />
          <Route path="Food" element={<Food />} />
          <Route path="Exercise" element={<Exercise/>} />
        </Route>
      </Routes>
    </BrowserRouter> 
  // </React.StrictMode>
);
reportWebVitals();
