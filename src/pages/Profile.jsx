import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Profile.css'; 
import { FaArrowRight, FaEdit } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';  // Shirt icon



const Profile = () => {
  const navigate = useNavigate();

  // Handler for button navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container className="profile-container">
      <Row className="mb-4">
        <Col className="text-center">
          <img 
            src="/path-to-user-photo.jpg" 
            alt="User Profile" 
            className="profile-photo" 
          />
        </Col>
        <Col>
            <h2>User Name</h2>
            <p>Contact Number: +91XXXXXXXXXX</p>
            <Button variant="primary" className='flex-row-spaceBetween' onClick={() =>      handleNavigation('/edit-profile')}>
                Edit Profile 
                <FaEdit className="mr-2" /> {/* Edit icon */}
            </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
                  <Button variant="primary" className='flex-row-spaceBetween' onClick={() => handleNavigation('/order-history')}>
                  <FontAwesomeIcon icon={faTshirt} style={{ marginRight: '5px' }} />
            Order History
            <FaArrowRight className="ml-2" /> {/* Arrow icon */}
            </Button>
                </Col>
                <Col>
            <Button variant="primary" className='flex-row-spaceBetween' onClick={() => handleNavigation('/contact-us')}>
            Contact Us
            <FaArrowRight className="ml-2" /> {/* Arrow icon */}
            </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        
      </Row>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" className='flex-row-spaceBetween' onClick={() => handleNavigation('/dashboard')}>
            Dashboard
            <FaArrowRight className="ml-2" /> {/* Arrow icon */}
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" className='flex-row-spaceBetween' onClick={() => handleNavigation('/address')}>
            Address
            <FaArrowRight className="ml-2" /> {/* Arrow icon */}
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" className='flex-row-spaceBetween' onClick={() => handleNavigation('/faq')}>
            FAQ
            <FaArrowRight className="ml-2" /> {/* Arrow icon */}
            </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" className='flex-row-spaceBetween' onClick={() => handleNavigation('/about-us')}>
            About Us
            <FaArrowRight className="ml-2" /> {/* Arrow icon */}
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" className='flex-row-spaceBetween' onClick={() => handleNavigation('/reviews')}>
            Reviews
            <FaArrowRight className="ml-2" /> {/* Arrow icon */}
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" className='flex-row-spaceBetween' onClick={() => handleNavigation('/privacy-policy')}>
            Privacy Policy
            <FaArrowRight className="ml-2" /> {/* Arrow icon */}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
