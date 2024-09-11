// src/routes/userRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import LandingPage from '../pages/LandingPage.jsx';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  );
};

export default UserRoutes;