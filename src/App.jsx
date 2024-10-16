// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserRoutes from './router/userRoutes.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/userContext.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51QA8Hy2KS0ihxQVnfB2DUdzqXXQol1gfxGkmTsRHls2u8uD1JANFhVIrzrO14wSxMbwZmnJlpnXqTg3nmXzqvWsI009lFvq15x');// Replace with your actual publishable key

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Elements stripe={stripePromise}>
          {/* <PaymentPage  />   */}
          
         
          <UserRoutes />
        </Elements>
      </Router>
    </UserProvider>
  );
};

export default App;