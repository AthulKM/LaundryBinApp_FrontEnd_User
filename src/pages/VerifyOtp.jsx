import React, { useState } from 'react';
import axiosInstance from '../axios/axiosInstance.js';
import { Button, Form as BootstrapForm, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { otpToken, identifier } = location.state;

  const handleOTPSubmit = async () => {
    try {
      const response = await axiosInstance.post('/user/verify-otp', {
        otp,
        otpToken,
        identifier, // email or phoneNumber
      });

      if (response.data.success) {
        setSuccess('OTP verified successfully');
        navigate('/landing'); // Redirect to landing page after successful OTP verification
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Invalid OTP');
    }
  };

  return (
    <div className="padding-top-50">
      <h2>Enter the OTP sent to {identifier}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <BootstrapForm>
        <BootstrapForm.Group controlId="otp">
          <BootstrapForm.Label>OTP</BootstrapForm.Label>
          <BootstrapForm.Control
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </BootstrapForm.Group>

        <Button variant="primary" onClick={handleOTPSubmit}>
          Verify OTP
        </Button>
      </BootstrapForm>
    </div>
  );
};

export default VerifyOtp;
