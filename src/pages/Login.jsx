
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../axios/axiosInstance.js';
import { Button, Form as BootstrapForm, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const navigate = useNavigate();

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
      .required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      // Sending identifier (email or phoneNumber) and password to backend
      const response = await axiosInstance.post('/user/login/', {
        identifier: values.identifier, // can be either email or phoneNumber
        password: values.password,
      });
      setStatus({ success: response.data.message });
      
      
      const token = response.data.token;
      localStorage.setItem('userToken', token); 
      
      // Redirect to LandingPage
      navigate('/landing', { state: { user: { email: values.identifier } } }); // Passing identifier as email
    } catch (error) {
      setStatus({ error: error.response ? error.response.data.message : 'Login failed' });
    }
    setSubmitting(false);
  };

  return (
    <Container className='formContainer'>
      <h2>Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, status }) => (
          <Form className='loginForm' as={BootstrapForm}>
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

            <Button className='loginButton' variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;