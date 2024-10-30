import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../axios/axiosInstance.js';
import { Button, Form as BootstrapForm, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';


const VerifyOtp = ({ userId }) => {
  const { login, setUser, setAuthToken } = useAuth();
    const {id, userName, userData, setUserData} = useUser();
  const [otp, setOtp] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const navigate = useNavigate();

  const initialValues = { otp: '' };

  const validationSchema = Yup.object({
    otp: Yup.number().required('OTP is required').typeError('OTP must be a number'),
  });

  const handleVerifyOTP = async (values, { setSubmitting }) => {
    try {
      const response = await axiosInstance.post('/user/verify-otp', {
        userId: id,
        otp: values.otp,
      });
  
      // Extract token and user data from the response
      const { token, data: user } = response.data;
  
      // Update status, user, and token in state
      setStatusMessage({ success: response.data.message });
      setUser(user);
      setAuthToken(token);
      login(user,token);
  
      // Save to local storage
      localStorage.setItem('userToken', token);
      localStorage.setItem('userData', JSON.stringify(user));
  
      // Navigate to the landing page with user data
      navigate('/landing', { state: { user, id } });
      
    } catch (error) {
      setStatusMessage({
        error: error.response ? error.response.data.message : 'OTP verification failed',
      });
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <Container className="formContainer">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleVerifyOTP}>
        {({ isSubmitting }) => (
          <Form className="loginForm" as={BootstrapForm}>
            {statusMessage && statusMessage.error && <Alert variant="danger">{statusMessage.error}</Alert>}
            {statusMessage && statusMessage.success && <Alert variant="success">{statusMessage.success}</Alert>}

            <BootstrapForm.Group controlId="otp">
              <BootstrapForm.Label>Enter OTP</BootstrapForm.Label>
              <Field
                name="otp"
                type="number"
                as={BootstrapForm.Control}
                placeholder="Enter OTP"
              />
              <ErrorMessage name="otp" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <Button className="loginButton mt-20" variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying OTP...' : 'Verify'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default VerifyOtp;
