import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Container, Alert } from 'react-bootstrap';
import axiosInstance from '../axios/axiosInstance.js';
import '../App.css';
import { useUser } from '../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';


const PasswordReset = ({ userId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useUser();
    const navigate = useNavigate();

  const initialValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      // Make API call to update password
      const response = await axiosInstance.post('/user/reset-password', {
        userId:id, // This should be passed as a prop or from context
        newPassword: values.newPassword,
      });

      if (response.data.success) {
        setResetSuccess(true);
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Password reset failed');
    }
    setIsSubmitting(false);
  };

    const backToLogin = () => {
        navigate('/login');
    }
    return (

  
    <div className="padding-top-50">
      <Container className="formContainer">
        {resetSuccess ? (
                  <><Alert variant="success">Password has been reset successfully!</Alert>
                  <div>
                  <Button onClick={backToLogin}>
                      Back to Login
                  </Button>
              </div></>
        
                  
                    
                   ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched }) => (
              <Form className="resetPasswordForm" as={BootstrapForm}>
                {error && <Alert variant="danger">{error}</Alert>}

                <BootstrapForm.Group controlId="newPassword">
                  <BootstrapForm.Label>New Password</BootstrapForm.Label>
                  <Field
                    name="newPassword"
                    type="password"
                    as={BootstrapForm.Control}
                    placeholder="Enter new password"
                  />
                  <ErrorMessage name="newPassword" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="confirmPassword">
                  <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    as={BootstrapForm.Control}
                    placeholder="Confirm new password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <Button
                  className="resetPasswordButton mt-20"
                  variant="primary"
                  type="submit"
                  disabled={
                    isSubmitting || 
                    values.newPassword !== values.confirmPassword || 
                    !values.newPassword || !values.confirmPassword
                  }
                >
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </Button>
              </Form>
            )}
          </Formik>
        )}
            </Container>
            
            </div>
            
  );
};

export default PasswordReset;
