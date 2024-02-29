import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Splash from './pages/Splash';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
