import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../axios/axiosInstance.js';
import { Button, Form as BootstrapForm, Container, Alert } from 'react-bootstrap';
import '../App.css';
import { useUser } from '../context/userContext.jsx';

const Register = () => {
  const { setUser } = useUser();
  
  const initialValues = {
    username: '',
    identifier: '',  // This will be either email or phone number
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
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
      .required('Either email or phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axiosInstance.post('/user/register/', {
        username: values.username,
        password: values.password,
        // Send either email or phoneNumber based on the identifier
        ...(values.identifier.includes('@') 
          ? { email: values.identifier } 
          : { phoneNumber: values.identifier }),
      });


      setStatus({ success: response.data.message });
      // Save the username in context after successful registration
      setUser(values.username);
    } catch (error) {
      console.error("Registration Error:", error);
      setStatus({ error: error.response ? error.response.data.message : 'Registration failed' });
    }
    setSubmitting(false);
  };

  return (
    <Container>
      <h2>New user? Register here</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form as={BootstrapForm}>
            {status && status.error && <Alert variant="danger">{status.error}</Alert>}
            {status && status.success && <Alert variant="success">{status.success}</Alert>}

            <BootstrapForm.Group controlId="username">
              <BootstrapForm.Label>Username</BootstrapForm.Label>
              <Field name="username" type="text" as={BootstrapForm.Control} placeholder="Enter username" />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="identifier">
              <BootstrapForm.Label>Email or Phone Number</BootstrapForm.Label>
              <Field name="identifier" type="text" as={BootstrapForm.Control} placeholder="Enter email or phone number" />
              <ErrorMessage name="identifier" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="password">
              <BootstrapForm.Label>Password</BootstrapForm.Label>
              <Field name="password" type="password" as={BootstrapForm.Control} placeholder="Enter password" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="confirmPassword">
              <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
              <Field name="confirmPassword" type="password" as={BootstrapForm.Control} placeholder="Confirm password" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <Button className='mt-20' variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
