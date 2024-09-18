// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserRoutes from './router/userRoutes.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <UserRoutes />
    </Router>
  );
};

export default App;