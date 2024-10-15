import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form } from 'react-bootstrap';
import axiosInstance from '../axios/axiosInstance';

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
    const { data: { clientSecret } } = await axiosInstance.post('/payment-intent', {
      amount: totalAmount * 100, // Convert to cents
      currency: 'inr',
      paymentMethodType: paymentMethod,
    });

    // Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
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
    <Form onSubmit={handleSubmit}>
      <h5>Payment Method</h5>
      <CardElement />
      <Button type="submit" disabled={!stripe}>Pay ₹{totalAmount}</Button>
    </Form>
  );
};

export default PaymentPage;
