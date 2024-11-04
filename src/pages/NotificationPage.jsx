// NotificationPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import axiosInstance from '../axios/axiosInstance';
import { useAuth } from '../context/AuthContext';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notifications/${user._id}');
        if (response.data.status === 'Success') {
          setNotifications(response.data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (id) => {
    try {
      await axiosInstance.delete(`/notifications/${id}`);
      setNotifications(notifications.filter((notif) => notif._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <Container>
      <h2>Your Notifications</h2>
      <ListGroup>
        {notifications.length ? (
          notifications.map((notif) => (
            <ListGroup.Item key={notif._id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{notif.title}</strong>
                <p>{notif.message}</p>
                <small>{new Date(notif.createdAt).toLocaleDateString()}</small>
              </div>
              <Button variant="danger" onClick={() => handleDeleteNotification(notif._id)}>Delete</Button>
            </ListGroup.Item>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </ListGroup>
    </Container>
  );
};

export default NotificationPage;
