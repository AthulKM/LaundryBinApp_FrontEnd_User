// src/routes/userRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import VerifyOtp from '../pages/VerifyOtp.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import PasswordReset from '../pages/PasswordReset.jsx';
import VerifyPasswordResetOTP from '../pages/VerifyPasswordResetOTP.jsx';
import ItemsPage from '../pages/ItemsPage.jsx';
import Instructions from '../pages/Instructions.jsx';


const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-passwordreset-otp" element={ <VerifyPasswordResetOTP/>} />
        <Route path="/password-reset" element={ <PasswordReset/>} />
      
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/instructions" element={<Instructions />} />
    </Routes>

  );
};

export default UserRoutes;