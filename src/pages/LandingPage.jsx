
import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext.jsx';
import SlickSliderOffers from '../features/SlickSliderOffers.jsx';
import '../App.css';
import Categories from './Categories.jsx';
import { useAuth } from '../context/AuthContext.jsx';


const LandingPage = ({ user }) => {
  const { login, logout } = useAuth();
  const { userName, setUserName,id} = useUser(); // Access the user from context
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for userData
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // Parse the stored JSON
      if (parsedUser.username) {
        setUserName(parsedUser.username); // Set username if available
      }
    }
  }, [setUserName]); // Added setUserName as a dependency

  const handleLogout = () => {
    logout();
    
    navigate('/landing');
  };

  return (

    <Container className=" landingContainer">
      {userName ? <h2>Hello,<br /> {userName}! <br />Welcome to LaundryBin. </h2>

        : <h2>Hello there! <br />Welcome to LaundryBin.</h2>}


      
      

      <SlickSliderOffers />
      <Categories />

    </Container>




  );
};

export default LandingPage;