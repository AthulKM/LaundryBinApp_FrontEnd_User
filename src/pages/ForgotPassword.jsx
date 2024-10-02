import React from 'react'
import { useUser } from '../context/userContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Button, Form as BootstrapForm, Container, Alert } from 'react-bootstrap';
import '../App.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { setId, id } = useUser();

  const initialValues = {
    identifier: '', // either email or phone number
    
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
    
  });

  const handleForgotPassword = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axiosInstance.post('/user/forgot-password', {
        identifier: values.identifier,
        
      });
    
      // Navigate to password reset and pass userId
      if (response.data.success) {
            
            
        setId(response.data.data);
        navigate('/verify-passwordreset-otp');
      }
    } catch (error) {
      setStatus({ error: error.response ? error.response.data.message : 'Failed' });
    }
    setSubmitting(false);
        
    
          
  };


  return (
    <>
      <Container className="formContainer">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleForgotPassword}>
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

              
              
              <Button className="loginButton mt-20" variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending OTP ...' : 'Send OTP'}
              </Button>
              
              
              
            </Form>
          )}
        </Formik>
       
      </Container>
       
    </>
  )
}

export default ForgotPassword
