import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../Order.css';  // Assuming you'll style it separately

const Order = ({ order }) => {
//   const { categoryImage, createdDate, categoryName, orderStatus, receipt } = order;
    const createdDate = '2024-10-01';
    const categoryName = "wash";
    const categoryImage = '/src/assets/images/wash.jpg';
    const orderStatus = 'In Progress';
    const receipt = [{
        "idx": "123456",
        "name": "Shirt",
        "count": 5
    }];
        
    
    
  // Function to check button visibility and status based on order status
  const isAddRatingVisible = orderStatus === 'Completed';
  const isTrackingVisible = orderStatus !== 'Completed' && orderStatus !== 'Canceled';
  const isDetailsActive = orderStatus === 'Canceled';

  return (
    <Container className="order-container">
      <Row>
        {/* Left Section */}
        <Col md={4} className="categoryAndDate">
          {/* Category Image */}
          <div className="category-image">
            <img src={categoryImage} alt="Category" />
          </div>
          {/* Order Created Date */}
          <div className="created-date">
            <p> {new Date(createdDate).toLocaleDateString()}</p>
          </div>
        </Col>

        {/* Right Section */}
        <Col md={8} className="order-details">
          {/* Category and Status */}
          <div className="categoryAndStatus">
            <h5>{categoryName}</h5>
            <p>{orderStatus}</p>
          </div>

          {/* Items and Counts */}
          <div className="itemsAndCounts">
            
            <ul>
              {receipt.map((item, idx) => (
                <li key={idx}>
                      <div>{item.name}</div>
                      <div> x {item.count}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tracking and Rating Buttons */}
          <div className="trackingAndRating">
            <Button className="mr-2" variant="primary" disabled={!isDetailsActive}>Details</Button>
            {isTrackingVisible && <Button className="mr-2" variant="success">Tracking</Button>}
            {isAddRatingVisible && <Button variant="warning">Add Rating</Button>}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
