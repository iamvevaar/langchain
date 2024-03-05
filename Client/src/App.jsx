import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
<<<<<<< HEAD
import Home from './pages/Home/Home';
import Splash from './pages/SplashScreen/Splash';
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
=======
import Splash from './pages/SplashScreen/Splash';
import Dashboard from './pages/Dashboard/Dashboard';
import Ask from './pages/Ask/Ask';
function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Ask' element={<Ask />} />
      </Routes>
    </div>
  </Router>
  )
>>>>>>> d052b76912e4691eb1edea20f5f9023721ae0b19
}

export default App;
