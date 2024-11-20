import './App.scss';
import NavBar from './Component/NavBar';
import Footer from './Component/Footer'
import Main from './Component/Main';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './Component/Admin/Admin';
import LoginForm from './Component/Login/LoginForm';
const App = () => {
  return (
    <div>
      <div className="App">
        {/* <ToastContainer /> */}
        <NavBar />
        <Main />
        <Footer />
        {/* <LoginForm/> */}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>


  );
}

export default App;
