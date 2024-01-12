// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dictionary from './component/Dictionary';
import Login from './component/Login';
import Signup from './component/Signup';
import Dictionary2 from './component/Dictionary2';

function App() {
  const userId = localStorage.getItem('userId');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dictionary />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/User" element={<Dictionary2 />} />
      </Routes>
    </Router>
  );
}

export default App;
