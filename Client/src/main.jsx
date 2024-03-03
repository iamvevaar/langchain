import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import Ask from './pages/Ask/Ask.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
// import Dashboard from './pages/Main/Dashboard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/* <Home/> */}
    <Dashboard/>
  </>
  
)
