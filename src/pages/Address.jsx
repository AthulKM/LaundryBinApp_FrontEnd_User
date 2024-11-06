import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Container } from 'react-bootstrap';
import '../AddressesPage.css';

const Address = () => {
  const { user } = useAuth();

  return (
    <div className='addressesPage'>
      <Container>
      <h2>Saved Addresses:</h2>
      {user?.addresses?.length > 0 ? (
        <ul>
          {user.addresses.map((address, index) => (
            <li key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd' }}>
              <p><strong>Street:</strong> {address.street}</p>
              <p><strong>City:</strong> {address.city}</p>
              <p><strong>State:</strong> {address.state}</p>
              <p><strong>Postal Code:</strong> {address.postalCode}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved addresses found.</p>
      )}
      </Container>
      
    </div>
  );
};

export default Address;
