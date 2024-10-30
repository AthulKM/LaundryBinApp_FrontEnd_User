import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios/axiosInstance.js';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../categories.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext.jsx';

const Categories = () => {
  const { userName, id } = useUser();
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/category');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [categories]);
    
    // Handle card click to navigate to ItemsPage
  const handleCardClick = (categoryName) => {
    navigate('/items', { state: { categoryName, id, userName  }});  // Pass categoryName as state
  };

  return (
    <Container className="categories-container mt-5">
      {/* <h2 className="text-center">Choose a service : </h2> */}
      <Row>
        {categories.map((category) => (
          <Col key={category._id} xs={12} sm={6} md={4} lg={6} className="mb-4">
            <Card onClick={() => handleCardClick(category.name)} className="clickable-card">
              <Card.Img variant="top" src={category.image} alt={category.name} />
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>{category.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
