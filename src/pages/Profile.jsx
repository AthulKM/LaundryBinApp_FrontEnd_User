import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Profile.css'; 
import { FaArrowRight, FaEdit } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';  // Shirt icon

import axiosInstance from '../axios/axiosInstance';
import { useAuth } from '../context/AuthContext';


const Profile = () => {
  const navigate = useNavigate();
  
  const { user, updateUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    phoneNumber: user?.phoneNumber||'',
    profilePicture: user?.profilePicture||''
  });
  
  useEffect(() => {
    if (user) {
      
      setFormData({
        username: user.username,
        phoneNumber:user.phoneNumber,
        profilePicture: user.profilePicture
      });
    }
  }, [user]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    if (formData.profilePicture) {
      formDataToSend.append("profilePicture", formData.profilePicture);
    }
  
    try {
      const response = await axiosInstance.put(`/user/${user._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.status === "Success") {
        updateUser(formData);
        handleClose();
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };


  

  // Handler for button navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='profilePage'>
      <Container className="profile-container">
      {user ? (
        <Row className="mb-4">
        <Col className="text-center">
          <img 
            src={user.profilePicture} 
            alt="User Profile" 
            className="profile-photo" 
          />
        </Col>
        <Col>
          <h2>{user.username }</h2>
          <p>{ user.phoneNumber}</p>
            <Button variant="primary" className='flex-row-spaceBetween' onClick={handleShow}>
                Edit Profile 
                <FaEdit className="mr-2" /> {/* Edit icon */}
            </Button>
        </Col>
      </Row>
      ):(<p>Hello guest, Please log in to view your profile.</p>)}

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


      {/* Modal for editing profile */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formProfilePicture">
              <Form.Label>Profile Picture URL</Form.Label>
              <Form.Control 
                type="file" 
                name="profilePicture" 
                value={formData.profilePicture} 
                onChange={handleChange} 
                accept="image/*" //Accepts only image files
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
    </div>
    
  );
};

export default Profile;
