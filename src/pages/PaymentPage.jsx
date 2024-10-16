// PaymentPage.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form } from 'react-bootstrap';
import axiosInstance from '../axios/axiosInstance';
import '../Payment.css';

const PaymentPage = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState('card');  // Default to card

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;  // Stripe.js hasn't loaded yet
    }

    // Create payment intent
    const { data: { clientSecret } } = await axiosInstance.post('/user/payment-intent', {
      amount: totalAmount * 100, // Convert to cents
      currency: 'inr',
      paymentMethodType: paymentMethod,
    });

    // Confirm payment
    const result = await stripe.confirmPayment(clientSecret, {
      payment_method: {
        card: paymentMethod === 'card' ? elements.getElement(CardElement) : null,
        upi: paymentMethod === 'upi' ? { vpa: 'upi_id@bank' } : null,
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment successful!');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='payment-form'>
  <h5>Choose a Payment Method</h5>
  
  <div className='payment-method-radio'>
    <Form.Check 
      type="radio" 
      id="card" 
      label="Debit/Credit Card" 
      value="card" 
      name="paymentMethod" 
      onChange={(e) => setPaymentMethod(e.target.value)} 
      checked={paymentMethod === 'card'}
    />
    
    <Form.Check 
      type="radio" 
      id="upi" 
      label="UPI" 
      value="upi" 
      name="paymentMethod" 
      onChange={(e) => setPaymentMethod(e.target.value)} 
      checked={paymentMethod === 'upi'}
    />
    
    <Form.Check 
      type="radio" 
      id="netbanking" 
      label="Net Banking" 
      value="netbanking" 
      name="paymentMethod" 
      onChange={(e) => setPaymentMethod(e.target.value)} 
      checked={paymentMethod === 'netbanking'}
    />
  </div>

  {/* Render CardElement for Card Payments */}
  {paymentMethod === 'card' && (
    <div className='payment-method-element'>
      <CardElement />
    </div>
  )}

  {/* UPI Payment Input */}
  {paymentMethod === 'upi' && (
    <div className="mt-3">
      <Form.Group controlId="upiId">
        <Form.Label>Enter your UPI ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="example@upi"
          onChange={(e) => setUpiId(e.target.value)}
        />
      </Form.Group>
    </div>
  )}

  {/* Net Banking Input */}
  {paymentMethod === 'netbanking' && (
    <div className="mt-3">
      <Form.Group controlId="bankName">
        <Form.Label>Select Bank</Form.Label>
        <Form.Control
          as="select"
          onChange={(e) => setBankName(e.target.value)}
        >
          <option value="">Choose your bank</option>
          <option value="hdfc">HDFC Bank</option>
          <option value="icici">ICICI Bank</option>
          <option value="sbi">State Bank of India</option>
          <option value="axis">Axis Bank</option>
        </Form.Control>
      </Form.Group>
    </div>
  )}

  {/* Submit Button */}
  <Button type="submit" disabled={!stripe}   className='payBtn'>
    Pay ₹{totalAmount}
  </Button>
</Form>

  );
};

export default PaymentPage;
