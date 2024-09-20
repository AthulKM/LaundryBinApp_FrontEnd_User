
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext.jsx';


const LandingPage = ({ user }) => {
  const { userName } = useUser(); // Access the user from context
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login'); 
  };

  return (
    <Container className="text-center mt-5">
      {userName ? <h2>Hello, {userName}!</h2> : <h2>Hello, Guest!</h2>}
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