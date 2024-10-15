import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axiosInstance from '../axios/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Instructions.css';  // Custom CSS for further styling
import { useLocation, useNavigate } from 'react-router-dom';

const Instructions = () => {
    const location = useLocation();
  const { receipt } = location.state || {};  // Get receipt from location state
  const [water, setWater] = useState('Cold');
  const [fabricSoftener, setFabricSoftener] = useState('Yes');
  const [detergent, setDetergent] = useState('Scented');
  const [notes, setNotes] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

  const handleWaterChange = (e) => setWater(e.target.value);
  const handleFabricSoftenerChange = (e) => setFabricSoftener(e.target.value);
  const handleDetergentChange = (e) => setDetergent(e.target.value);
  const handleNotesChange = (e) => setNotes(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/instructions', {
        water,
        fabricSoftener,
        detergent,
        notes
      });
        setMessage('Instructions saved successfully!');
        navigate('/summary', { state: { receipt } });
    } catch (error) {
      console.error('Error saving instructions:', error);
      setMessage('Failed to save instructions.');
    }
  };

  return (
    <Container className="instructions-container mt-4">
      <h2 className="text-center mb-4">Laundry Instructions</h2>

      <Form onSubmit={handleSubmit}>
        {/* Water Selection */}
        <Row className="mb-3">
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <i className="material-icons water-icon">opacity</i>
            <span className="ml-2">Water:</span>
          </Col>
          <Col md={6} className='radio-buttons'>
            <Form.Check 
              type="radio" 
              label="Hot" 
              value="Hot" 
              checked={water === 'Hot'} 
              onChange={handleWaterChange} 
              className="radio-option"
            />
            <Form.Check 
              type="radio" 
              label="Cold" 
              value="Cold" 
              checked={water === 'Cold'} 
              onChange={handleWaterChange} 
              className="radio-option"
            />
          </Col>
        </Row>

        {/* Fabric Softener Selection */}
        <Row className="mb-3">
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <i className="material-icons softener-icon">local_laundry_service</i>
            <span className="ml-2">Fabric Softener:</span>
          </Col>
          <Col md={6} className='radio-buttons'>
            <Form.Check 
              type="radio" 
              label="Yes" 
              value="Yes" 
              checked={fabricSoftener === 'Yes'} 
              onChange={handleFabricSoftenerChange} 
              className="radio-option"
            />
            <Form.Check 
              type="radio" 
              label="No" 
              value="No" 
              checked={fabricSoftener === 'No'} 
              onChange={handleFabricSoftenerChange} 
              className="radio-option"
            />
          </Col>
        </Row>

        {/* Detergent Selection */}
        <Row className="mb-3">
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <i className="material-icons detergent-icon">soap</i>
            <span className="ml-2">Detergent:</span>
          </Col>
          <Col md={6} className='radio-buttons'>
            <Form.Check 
              type="radio" 
              label="Scented" 
              value="Scented" 
              checked={detergent === 'Scented'} 
              onChange={handleDetergentChange} 
              className="radio-option"
            />
            <Form.Check 
              type="radio" 
              label="Normal" 
              value="Normal" 
              checked={detergent === 'Normal'} 
              onChange={handleDetergentChange} 
              className="radio-option"
            />
          </Col>
        </Row>

        {/* Notes Section */}
        <Row className="mb-4">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Additional Notes:</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Add any specific instructions here..." 
                value={notes}
                onChange={handleNotesChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Save Button */}
        <Row>
          <Col className="text-center">
            <Button variant="primary" type="submit">Next</Button>
          </Col>
        </Row>

        {/* Feedback Message */}
        {message && <Row className="mt-3">
          <Col className="text-center">
            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
              {message}
            </div>
          </Col>
        </Row>}
      </Form>
    </Container>
  );
};

export default Instructions;
