import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../axios/axiosInstance';

const OrderTracking = () => {
  const [trackings, setTrackings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tracking details for all orders on component mount
  useEffect(() => {
    const fetchTrackings = async () => {
      try {
        const response = await axiosInstance.get('/orderTracking');
        setTrackings(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tracking data:", error);
        setLoading(false);
      }
    };
    fetchTrackings();
  }, []);

  return (
    <div>
      <h1>Order Tracking</h1>
      {loading ? <p>Loading...</p> : trackings.map((tracking) => (
        <div key={tracking._id} className="tracking-info">
          <h3>Order ID: {tracking.orderId}</h3>
          <p>Status: {tracking.status}</p>
          <p>Estimated Delivery: {tracking.estimatedDelivery}</p>
          <p>Tracking History:</p>
          <ul>
            {tracking.history.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderTracking;
