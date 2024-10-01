import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../axios/axiosInstance.js';
import { Button, Form as BootstrapForm, Container, Alert } from 'react-bootstrap';
import '../App.css';
import { useUser } from '../context/userContext.jsx';

const Login = () => {
const [otp, setOtp] = useState('');
const [userId, setUserId] = useState(null);
const [otpStep, setOtpStep] = useState(false);
  const { setUserName } = useUser();
  

  const initialValues = {
    identifier: '', // either email or phone number
    password: '',
  };

  const validationSchema = Yup.object({
    identifier: Yup.string()
      .test(
        'is-valid-identifier',
        'Please enter a valid email or 10-digit phone number',
        (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const phoneRegex = /^[0-9]{10}$/;
          return emailRegex.test(value) || phoneRegex.test(value);
        }
      )
      .required('Email or Phone Number is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    console.log(identifier, password);
    try {

      // Send identifier (email or phoneNumber) and password to backend for OTP generation
      // const identifierField = /^[0-9]{10}$/.test(values.identifier) ? 'phoneNumber' : 'email';


      const response = await axiosInstance.post('/user/login', {
        identifier: values.identifier, // can be either email or phoneNumber
        password: values.password,
      });
      setUserId(response.data.userId);
      setOtpStep(true); // Show OTP input
      alert(response.data.message); // Show message that OTP was sent


      if (response.data.success) {
        setUserName(response.data.data.username); // Set userName in context
      }
      
      setStatus({ success: response.data.message });

      // Store user token in local storage if needed
      const token = response.data.token;
      localStorage.setItem('userToken', token);
    } catch (error) {
      setStatus({ error: error.response ? error.response.data.message : 'Login failed' });
    }
    setSubmitting(false);
  };

  // OTP submission
  const handleVerifyOTP    = async () => {
  try {
    const response = await axiosInstance.post('/user/verify-otp', { userId, otp });
    alert(response.data.message); // Login successful, token returned
    // Save token to localStorage or set as auth header
  } catch (error) {
    console.error(error.message);
  }
};

  return (
    <div className="padding-top-50">
      <div className="appName sofadi-one-regular">
        <h1>Laundrybin</h1>
      </div>
      {
        !otpStep ? (
      <Container className="formContainer">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, status }) => (
            <Form className="loginForm" as={BootstrapForm}>
              {status && status.error && <Alert variant="danger">{status.error}</Alert>}
              {status && status.success && <Alert variant="success">{status.success}</Alert>}

              <BootstrapForm.Group controlId="identifier">
                <BootstrapForm.Label>Email or Phone Number</BootstrapForm.Label>
                <Field
                  name="identifier"
                  type="text"
                  as={BootstrapForm.Control}
                      placeholder="Enter email or phone number"
                      
                      
                />
                <ErrorMessage name="identifier" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="password">
                <BootstrapForm.Label>Password</BootstrapForm.Label>
                <Field
                  name="password"
                  type="password"
                  as={BootstrapForm.Control}
                      placeholder="Enter password"
                      
                      
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <Button className="loginButton mt-20" variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
        </Container>)
        : (
          <Container className="formContainer">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleVerifyOTP}>
          {({ isSubmitting, status }) => (
            <Form className="loginForm" as={BootstrapForm}>
              {status && status.error && <Alert variant="danger">{status.error}</Alert>}
              {status && status.success && <Alert variant="success">{status.success}</Alert>}

              <BootstrapForm.Group controlId="otp">
                <BootstrapForm.Label>Enter OTP</BootstrapForm.Label>
                <Field
                  name="otp"
                        type="text"
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
        )
}
    </div>
  );
};

export default Login;
