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
import Summary from '../pages/Summary.jsx';
import PaymentPage from '../pages/PaymentPage.jsx';
import Order from '../pages/Order.jsx';
import OrderCancelPage from '../pages/OrderCancelPage.jsx';
import Profile from '../pages/Profile.jsx';
import OrderHistory from '../pages/OrderHistory.jsx';
import ContactUs from '../pages/ContactUs.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Address from '../pages/Address.jsx';
import Faq from '../pages/Faq.jsx';
import AboutUs from '../pages/AboutUs.jsx';
import Reviews from '../pages/Reviews.jsx';
import PrivacyPolicy from '../pages/PrivacyPolicy.jsx';
import NotificationPage from '../pages/NotificationPage.jsx';
import OrderTracking from '../pages/OrderTracking.jsx';


const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/address" element={<Address />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notifications" element={<NotificationPage/>} />
      <Route path="/order" element={<Order />} /> 
      <Route path="/cancel-order" element={<OrderCancelPage/>}/>
      <Route path="/order-history" element={<OrderHistory />} />
      <Route path="/order-tracking" element={<OrderTracking />} />
      <Route path="/password-reset" element={ <PasswordReset/>} />
      <Route path="/payment" element={<PaymentPage />}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/verify-passwordreset-otp" element={ <VerifyPasswordResetOTP/>} />

    </Routes>

  );
};

export default UserRoutes;