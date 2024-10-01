// src/routes/userRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import VerifyOtp from '../pages/VerifyOtp.jsx';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp/>} />
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  );
};

export default UserRoutes;