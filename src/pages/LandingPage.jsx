
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/'); 
  };

  return (
    <Container className="text-center mt-5">
      <h1>Welcome, {user?.email || 'User'}!</h1>
      <p>You have successfully logged in to the LaundryBinApp.</p>
      
      <Button variant="primary" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
      <Button variant="secondary" className="ml-2" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default LandingPage;