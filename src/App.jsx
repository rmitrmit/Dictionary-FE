// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dictionary from './component/Dictionary'; // Điều chỉnh đường dẫn của Dictionary
import Login from './component/Login'; // Điều chỉnh đường dẫn của Login
import Signup from './component/Signup'; // Điều chỉnh đường dẫn của Signup
import Dictionary2 from './component/Dictionary2' // Điều chỉnh đường dẫn khi đăng nhập thành công
function App() {
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
