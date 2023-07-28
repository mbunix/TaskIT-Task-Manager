import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/home/homepage'
import Onboarding from './pages/onboarding'
import './App.css'
function App() {
  
  return (
   
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Onboarding />} />
    <Route path='/homepage' element={<Homepage />} />
   </Routes>              
   </BrowserRouter>
  )
}

export default App
