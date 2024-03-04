import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
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
}

export default App
