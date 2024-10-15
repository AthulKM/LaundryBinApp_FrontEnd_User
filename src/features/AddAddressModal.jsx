import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../axios/axiosInstance'; // Use the axios instance you have set up

const AddAddressModal = ({ show, handleClose, userId, onSuccess }) => {
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleAddAddress = async () => {
    try {
      // Send POST request to update user with new address
      const response = await axiosInstance.put(`/user/${userId}`, { addresses: newAddress });
      console.log(response.data);
      onSuccess(response.data.addresses);  // Trigger callback to update addresses in the parent component
      handleClose();  // Close the modal
    } catch (error) {
      console.error("Error adding new address:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleChange}
              placeholder="Enter street"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              value={newAddress.postalCode}
              onChange={handleChange}
              placeholder="Enter postal code"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleAddAddress}>Add Address</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAddressModal;
