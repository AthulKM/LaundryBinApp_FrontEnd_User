import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../axios/axiosInstance.js';
import { Button, Form as BootstrapForm, Container, Alert } from 'react-bootstrap';
import '../App.css';
import { useUser } from '../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {

  const { login } = useAuth();
  const navigate = useNavigate();



  const { userName, setUserName, setId, id } = useUser();



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
    try {
      const response = await axiosInstance.post('/user/login', {
        identifier: values.identifier,
        password: values.password,
      });

      // Navigate to VerifyOtp and pass userId
      if (response.data.success) {

        
        setUserName(response.data.data);
        setId(response.data.userId);
        navigate('/verify-otp', { state: { userId: id } });
      }
    } catch (error) {
      setStatus({ error: error.response ? error.response.data.message : 'Login failed' });
    }
    setSubmitting(false);



  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  }



  return (
    <div className="padding-top-50">
      <div className="appName sofadi-one-regular">
        {/* <h1>Laundrybin</h1> */}
      </div>


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

              <BootstrapForm.Group controlId="password" className='mt-20'>
                <BootstrapForm.Label >Password</BootstrapForm.Label>
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

              <button className="paragraphButton mt-20" onClick={handleForgotPassword}>
                <p>Forgot password ?</p>
              </button>

            </Form>
          )}

        </Formik>

      </Container>



    </div>
  );
};

export default Login;
