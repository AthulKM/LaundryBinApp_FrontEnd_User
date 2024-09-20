// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserRoutes from './router/userRoutes.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/userContext.jsx';

const App = () => {
  return (
    <UserProvider>
    <Router>
      
      <UserRoutes />

    </Router>
    </UserProvider>
  );
};

export default App;