import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/todos" element={<TodoList />} />
            <Route path="/" element={<Navigate to="/login"  />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
