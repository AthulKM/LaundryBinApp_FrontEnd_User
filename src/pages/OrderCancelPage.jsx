import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Order.css';

const OrderCancelPage = ({ order }) => {
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');
    const navigate = useNavigate();

    const handleCancelClick = () => {
        setShowCancelModal(true);
    };

    const handleConfirmCancel = () => {
        setShowCancelModal(false);
        setShowReasonModal(true);
    };

    const handleSubmitReason = () => {
        // Logic to submit the reason
        setShowReasonModal(false);
        setShowConfirmationModal(true);
    };

    const handleBackToHome = () => {
        setShowConfirmationModal(false);
        navigate('/landing');  // Navigate to home page
    };

    const handleCloseModal = () => setShowCancelModal(false);

    return (
        <Container className="mt-4">
            <h4>Order ID: order.id</h4>

            {/* 1. Order Status */}
            <section className="mb-4">
                <h5>Status: order.status</h5>
            </section>

            {/* 2. Pickup Details */}
            <section className="mb-4">
                <h5>Pickup Details</h5>
                <p>Address: order.pickupAddress</p>
                <p>Date: order.pickupDate</p>
                <p>Time: order.pickupTime</p>
                <Button variant="secondary">Reschedule Pickup</Button>
            </section>

            {/* 3. Delivery Details */}
            <section className="mb-4">
                <h5>Delivery Details</h5>
                <p>Address: order.deliveryAddress</p>
                <p>Date: order.deliveryDate</p>
                <p>Time: order.deliveryTime</p>
                <Button variant="secondary">Reschedule Delivery</Button>
            </section>

            {/* 4. Receipt */}
            <section className="mb-4">
                <h5>Receipt</h5>
                {/* {order.items.map((item, idx) => ( */}
                    {/* <p key={idx}> */}
                    <p>    
                     item.name  -  item.count  x ₹item.cost
                    </p>
                {/* ))} */}
                <p><strong>Total Cost: ₹order.totalCost</strong></p>
            </section>

            {/* 5. Cancel Booking */}
            <section>
                <Button variant="danger" onClick={handleCancelClick}>Cancel Booking</Button>
            </section>

            {/* Cancel Confirmation Modal */}
            <Modal show={showCancelModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Cancellation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to cancel this booking?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleConfirmCancel}>
                        Yes, Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Reason Modal */}
            <Modal show={showReasonModal}>
                <Modal.Header>
                    <Modal.Title>Select a Reason for Cancellation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Check 
                            type="radio" 
                            label="Change of plans" 
                            value="Change of plans" 
                            checked={selectedReason === 'Change of plans'} 
                            onChange={(e) => setSelectedReason(e.target.value)}
                        />
                        <Form.Check 
                            type="radio" 
                            label="Emergencies" 
                            value="Emergencies" 
                            checked={selectedReason === 'Emergencies'} 
                            onChange={(e) => setSelectedReason(e.target.value)}
                        />
                        <Form.Check 
                            type="radio" 
                            label="Travel Plans" 
                            value="Travel Plans" 
                            checked={selectedReason === 'Travel Plans'} 
                            onChange={(e) => setSelectedReason(e.target.value)}
                        />
                        <Form.Check 
                            type="radio" 
                            label="Budget Constraints" 
                            value="Budget Constraints" 
                            checked={selectedReason === 'Budget Constraints'} 
                            onChange={(e) => setSelectedReason(e.target.value)}
                        />
                        <Form.Check 
                            type="radio" 
                            label="Unsatisfactory Service Experience" 
                            value="Unsatisfactory Service Experience" 
                            checked={selectedReason === 'Unsatisfactory Service Experience'} 
                            onChange={(e) => setSelectedReason(e.target.value)}
                        />
                        <Form.Check 
                            type="radio" 
                            label="Availability of Alternatives" 
                            value="Availability of Alternatives" 
                            checked={selectedReason === 'Availability of Alternatives'} 
                            onChange={(e) => setSelectedReason(e.target.value)}
                        />
                        <Form.Check 
                            type="radio" 
                            label="Personal Health Issues" 
                            value="Personal Health Issues" 
                            checked={selectedReason === 'Personal Health Issues'} 
                            onChange={(e) => setSelectedReason(e.target.value)}
                        />
                        <Form.Check 
                            type="radio" 
                            label="Quality Concerns" 
                            value="Quality Concerns" 
                            checked={selectedReason === 'Quality Concerns'} 
                            onChange={(e) => setSelectedReason(e.target.value)}
                        />
                        <Form.Check 
                            type="radio" 
                            label="Change in Laundry Volume" 
                            value="Change in Laundry Volume" 
                            checked={selectedReason === 'Change in Laundry Volume'} 
                            onChange={(e) => setSelectedReason(e.target.value)}
                        />
                        <Form.Check 
                            type="radio" 
                            label="Other" 
                            value="Other" 
                            checked={selectedReason === 'Other'} 
                            onChange={(e) => setSelectedReason(e.target.value)}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReasonModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitReason}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Booking Cancelled Modal */}
            <Modal show={showConfirmationModal}>
                <Modal.Header>
                    <Modal.Title>Booking Cancelled</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your booking has been successfully cancelled.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleBackToHome}>
                        Back to Home
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default OrderCancelPage;
