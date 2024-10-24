import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import '../Summary.css';  // Add custom styling here
import AddAddressModal from '../features/AddAddressModal'; 
import axiosInstance from '../axios/axiosInstance';
import { useUser } from '../context/userContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QA8Hy2KS0ihxQVnfB2DUdzqXXQol1gfxGkmTsRHls2u8uD1JANFhVIrzrO14wSxMbwZmnJlpnXqTg3nmXzqvWsI009lFvq15x');


const Summary = () => {
    
    
    const [receipt, setReceipt] = useState([]);
    const [pickupDate, setPickupDate] = useState(null);
    const { id } = useUser();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('address');
  const [couponCode, setCouponCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [addresses, setAddresses] = useState([]);
    const [showAddAddressModal, setShowAddAddressModal] = useState(false); 

    useEffect(() => {
        // Fetch user by id to get the addresses
        const fetchUserData = async () => {
            try {
                
            const response = await axiosInstance.get(`/user/${id}`);
                const userData = response.data.data;
                
                setAddresses(userData.addresses);  
                
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
    }, [id]);
    
    useEffect(() => {
        const storedReceipt = localStorage.getItem('receipt');
        if (storedReceipt) {
          setReceipt(JSON.parse(storedReceipt));
        }
        console.log(receipt);
      }, []);
      



      const handleAddressChange = (e) => {
        if (e.target.value === 'new') {
          setShowAddAddressModal(true);  // Show modal when "Add new address" is selected
        } else {
          setSelectedAddress(e.target.value);
        }
      };
    
    // Handle successful address addition and update addresses list
  const handleNewAddressSuccess = (updatedAddresses) => {
    setShowAddAddressModal(false);
    // Assuming addresses is a state, update the addresses here
    // setAddresses(updatedAddresses);
  };
    
  const handleDateChange = (e) => setPickupDate(e.target.value);
  const handleCouponCodeChange = (e) => setCouponCode(e.target.value);
  const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);

  const handleSubmitCoupon = () => {
    // Handle coupon code logic
    console.log('Coupon code submitted:', couponCode);
  };

  // Sample slick carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
    
    
    // payment 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const stripe = await stripePromise;
    
        // Call the backend to create a checkout session
        const { data } = await axiosInstance.post('/user/create-checkout-session', {
          paymentMethod,
          amount: receipt.overallCharge * 100, // In smallest currency unit (e.g., paise for INR)
        });
    
        // Redirect to Stripe's Checkout page
        const result = await stripe.redirectToCheckout({
          sessionId: data.id,
        });
    
        if (result.error) {
          console.error(result.error.message);
        }
      };
    
  

  return (
    <Container className="summary-container mt-4">
      {/* Addresses Section */}
      <Row className="mb-3">
        <Col>
          
          <Form>
  <h4>Pick-up Point</h4>
  {addresses && addresses.length > 0 ? (
    addresses.map((address) => (
      <Form.Check 
        key={address._id} 
        type="radio" 
        label={`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`} 
        value={address._id}
        checked={selectedAddress === address._id} 
        onChange={handleAddressChange} 
        name="address"  // Grouping the radio buttons
      />
    ))
  ) : (
    <div>No addresses available</div>
    )}
                      
    {/* Option to add new address */}
          <Form.Check 
            type="radio" 
            label="Add new address" 
            value="new" 
            checked={selectedAddress === 'new'} 
            onChange={handleAddressChange}
            name="address"
          />
  {/* Add Address Modal */}
  <AddAddressModal
        show={showAddAddressModal}
        handleClose={() => setShowAddAddressModal(false)}
        userId={id}
        onSuccess={handleNewAddressSuccess}  // Callback on address addition
      />
</Form>
        </Col>
      </Row>

      {/* Pick-up Date Section */}
      <Row className="mb-3 pickupDate">
      <Col>
      <h4>Pick-up Date</h4>
      <InputGroup>
        <DatePicker
          selected={pickupDate}     // Bind selected date
          onChange={(date) => setPickupDate(date)}  // Handle date change
          dateFormat="dd-MM-yyyy"   // Date format
          customInput={             // Customize input with Form.Control
            <Form.Control type="text" placeholder="Select pick-up date" />
          }
        />
        <InputGroup.Text onClick={() => document.querySelector('.react-datepicker__input-container input').focus()}>
          <span className="material-icons">calendar_today</span>  {/* Material icon for calendar */}
        </InputGroup.Text>
      </InputGroup>
    </Col>
      </Row>

      {/* Delivery Method Section */}
      <Row className="mb-3">
        <Col>
          <h4>Delivery Method</h4>
          <Form.Check 
            type="radio" 
            label="Pick-up at Address" 
            value="address" 
            checked={deliveryMethod === 'address'} 
            onChange={() => setDeliveryMethod('address')} 
          />
          <Form.Check 
            type="radio" 
            label="Pick-up at Store" 
            value="store" 
            checked={deliveryMethod === 'store'} 
            onChange={() => setDeliveryMethod('store')} 
          />
        </Col>
      </Row>

      {/* Coupon Code Section */}
      <Row className="mb-3">
        <Col>
          <h4>Offer Coupon Code</h4>
          <Form.Control 
            type="text" 
            placeholder="Enter coupon code" 
            value={couponCode} 
            onChange={handleCouponCodeChange} 
          />
          <Button className="mt-2" onClick={handleSubmitCoupon}>Apply Coupon</Button>
        </Col>
      </Row>

      {/* Offers Carousel Section */}
      <Row className="mb-3">
        <Col>
          <h4>Offers</h4>
          <Slider {...sliderSettings}>
            {/* Replace with dynamic offers */}
            <div><h5>Offer 1</h5></div>
            <div><h5>Offer 2</h5></div>
            <div><h5>Offer 3</h5></div>
          </Slider>
        </Col>
      </Row>

      {/* Receipt Section */}
<Row className="mb-3 receipt-section">
  <Col>
    <h4>Receipt</h4>
    <ul className="receipt-list">
      {receipt.items && receipt.items.length > 0 ? (
        receipt.items.map((item, idx) => (
            <li key={idx}>
                <div className='item-name'>{item.itemName}</div>
                <div className='item-count'>x {item.count}</div>
                <div className='item-charge'>₹{item.charge * item.count}</div>
          </li>
        ))
      ) : (
        <li>No items selected</li>
      )}
    </ul>
    <h5>Total: ₹{receipt.overallCharge}</h5>
  </Col>
</Row>



      {/* Payment Method Section */}
      <Row className="mb-3">
        <Col>
          <h4>Payment Method</h4>
          <Form onSubmit={handleSubmit}>
      
      <Form.Check 
        type="radio" 
        label="Cash on Delivery (COD)" 
        value="COD" 
        checked={paymentMethod === 'COD'} 
        onChange={handlePaymentMethodChange} 
      />
      <Form.Check 
        type="radio" 
        label="card" 
        value="card" 
        checked={paymentMethod === 'card'} 
        onChange={handlePaymentMethodChange} 
      />
      <Form.Check 
        type="radio" 
        label="UPI" 
        value="UPI" 
        checked={paymentMethod === 'UPI'} 
        onChange={handlePaymentMethodChange} 
      />

      <Button type="submit" disabled={paymentMethod === 'COD'}>Pay Now</Button>
    </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Summary;
