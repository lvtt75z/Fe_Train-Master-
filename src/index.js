import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route,} from "react-router-dom"
import Admin from './Component/Admin/Admin'
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './Component/Admin/Content/DashBoard';
import Food from './Component/Admin/Content/Food/ManagerFood';
import Exercise from './Component/Admin/Content/Exercise/ManagerExercise'
import MealPlan from './Component/Admin/Content/MealPlan/ManagerMealPlan'
import Program from './Component/Admin/Content/Program/ManagerProgram'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/Admins" element={<Admin/>} >
          <Route index element={<DashBoard />} />
          <Route path="Food" element={<Food />} />
          {/* <Route path="Exercise" element={<Exercise/>} /> */}
          <Route path="MealPlan" element={<MealPlan/>} />
          <Route path="Program" element={<Program/>} />
        </Route>
      </Routes>
    </BrowserRouter> 
  // </React.StrictMode>
);
reportWebVitals();
