import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar' // Fix import path to match actual directory casing
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeProvider } from './context/DarkModeContext'

const App = () => {
  const url = "https://meals-by-manoj-backend.onrender.com"

  return (
    <DarkModeProvider>
      <div>
        <ToastContainer theme="colored" />
        <Navbar />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Add url={url}/>}/>
            <Route path="/add" element={<Add url={url}/>}/>
            <Route path="/list" element={<List url={url}/>}/>
            <Route path="/orders" element={<Orders url={url}/>}/>
          </Routes>
        </div>
      </div>
    </DarkModeProvider>
  )
}

export default App