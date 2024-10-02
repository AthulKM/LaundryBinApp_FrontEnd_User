import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../axios/axiosInstance.js';
import { Button, Form as BootstrapForm, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const VerifyOtp = ({ userId }) => {
  const [otp, setOtp] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const navigate = useNavigate();

  const initialValues = { otp: 0 };

  const validationSchema = Yup.object({
    otp: Yup.string().required('OTP is required'),
  });

  const handleVerifyOTP = async (values, { setSubmitting }) => {
      try {
      const response = await axiosInstance.post('/user/verify-otp', {
        userId,
        otp: values.otp,
      });
      setStatusMessage({ success: response.data.message });

      // Navigate to another page (e.g., dashboard) upon successful OTP verification
      navigate('/landing');
    } catch (error) {
      setStatusMessage({
        error: error.response ? error.response.data.message : 'OTP verification failed',
      });
    }
    setSubmitting(false);
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
