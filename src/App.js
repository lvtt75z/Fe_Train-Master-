import './App.scss';
import NavBar from './Component/NavBar';
import Footer from './Component/Footer'
import Main from './Component/Main';
const App = () => {
  return (
    <div className="App">
      <NavBar />
        <Main />
        <Footer />
    </div>
  );
}

export default App;
