import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios/axiosInstance.js';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

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
  }, []);

  return (
    <Container className="categories-container mt-5">
      <h2 className="text-center">Our Services</h2>
      <Row>
        {categories.map((category) => (
          <Col key={category._id} xs={12} sm={6} md={4} lg={6} className="mb-4">
            <Card>
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
