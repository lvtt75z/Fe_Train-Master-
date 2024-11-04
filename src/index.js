import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route,} from "react-router-dom"
import User from './Component/User/User'
import Admin from './Component/Admin/Admin'
import Home from './Component/Home/Home';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}> 
          <Route index element={<Home />} />  
          <Route path="Users" element={<User />} />  
          <Route path="Admins" element={<Admin/>} />  
        </Route>  
      </Routes>
      
    </BrowserRouter> 
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
