// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserRoutes from './router/userRoutes.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider, useUser } from './context/userContext.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import NavBar from './features/NavBar.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

import Footer from './features/Footer.jsx';
import './App.css';
import './footer.css';

const stripePromise = loadStripe('pk_test_51QA8Hy2KS0ihxQVnfB2DUdzqXXQol1gfxGkmTsRHls2u8uD1JANFhVIrzrO14wSxMbwZmnJlpnXqTg3nmXzqvWsI009lFvq15x');// Replace with your actual publishable key

const App = () => {
  const { setUser, setAuthToken } = useAuth();

  useEffect(() => {
    const savedToken = localStorage.getItem('userToken');
    const savedUser = JSON.parse(localStorage.getItem('userData'))? JSON.parse(localStorage.getItem('userData')) 
    : null;

    // If token and user data are found, set them in the application state
    if (savedToken && savedUser) {
      setAuthToken(savedToken);
      setUser(savedUser);
    }
  }, [setAuthToken, setUser]);

  return (
    <AuthProvider>
      <UserProvider>
      <Router>
        <Elements stripe={stripePromise}>
          {/* <PaymentPage  />   */}
          
          <NavBar/>
            <UserRoutes />
            
          </Elements>
          <Footer/>
      </Router>
    </UserProvider>
    </AuthProvider>
    
  );
};

export default App;