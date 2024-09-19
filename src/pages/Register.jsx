import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../axios/axiosInstance.js';
import { Button, Form as BootstrapForm, Container, Alert } from 'react-bootstrap';

const Register = () => {
  const initialValues = {
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };

  // const validationSchema = Yup.object({
  //   username: Yup.string().required('Username is required'),
  //   email: Yup.string().email('Invalid email address')
  //     .nullable()
  //     .when('phoneNumber', {
  //       is: (val) => !val || val.length === 0,
  //       then: Yup.string().required('Either email or phone number is required'),
  //       otherwise: Yup.string().nullable(),
  //     }),
  //   phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
  //     .nullable()
  //     .when('email', {
  //       is: (val) => !val || val.length === 0,
  //       then: Yup.string().required('Either email or phone number is required'),
  //       otherwise: Yup.string().nullable(),
  //     }),
  //   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
  //     .required('Confirm password is required'),
  // });
  
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .nullable(true), // Allow null values
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .nullable(true), // Allow null values
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  }).test('email-or-phone', 'Either email or phone number is required', function (value) {
    const { email, phoneNumber } = value;
    return !!email || !!phoneNumber;
  });
  

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axiosInstance.post('/user/register/', values);
      setStatus({ success: response.data.message });
    } catch (error) {
      setStatus({ error: error.response ? error.response.data.message : 'Registration failed' });
    }
    setSubmitting(false);
  };

  return (
    <Container>
      <h2>Register</h2>
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

            <BootstrapForm.Group controlId="email">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <Field name="email" type="email" as={BootstrapForm.Control} placeholder="Enter email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="phoneNumber">
              <BootstrapForm.Label>Phone Number</BootstrapForm.Label>
              <Field name="phoneNumber" type="text" as={BootstrapForm.Control} placeholder="Enter phone number" />
              <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
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

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
