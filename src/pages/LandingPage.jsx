
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext.jsx';
import SlickSlider from '../features/SlickSliderOffers.jsx';
import '../App.css';
import Categories from './Categories.jsx';


const LandingPage = ({ user }) => {
  const { userName } = useUser(); // Access the user from context
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login'); 
  };

  return (
    
    <Container className=" landingContainer">
      {userName ? <h2>Hello,<br /> {userName}! <br />Welcome back to LaundryBin.</h2>
        
        : <h2>Hello there! <br />Welcome to LaundryBin.</h2>}
      
      
      <Button variant="primary" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
      <Button variant="secondary" className="ml-2" onClick={handleLogout}>
        Logout
      </Button>
      
      <SlickSlider />
      <Categories/>
    
    </Container>
    
    
    
    
  );
};

export default LandingPage;