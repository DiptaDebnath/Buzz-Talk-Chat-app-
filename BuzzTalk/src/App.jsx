import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import SetAvatar from './pages/SetAvatar'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Chat/>}></Route>
        <Route exact path="/Login" element={<Login/>}></Route>
        <Route exact path="/Register" element={<Register/>}></Route>
        <Route exact path="/setAvatar" element={<SetAvatar/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
      </Routes>
    
  </Router>
  )
}

