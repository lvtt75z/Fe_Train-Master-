import logo from './logo.svg';
import './App.scss';
import Header from './Component/Header/Header';
import { Outlet, Link } from "react-router-dom";
const App = () => {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container'>
          
        </div>
        
        <div className='app-container'>
          <Outlet/>
        </div> 
      </div>
    </div>
  );
}

export default App;
