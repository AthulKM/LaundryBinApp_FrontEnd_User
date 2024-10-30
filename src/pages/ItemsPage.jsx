import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import '../ItemsPage.css';  // Assuming this file holds the styles
import axiosInstance from '../axios/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';

const ItemsPage = () => {
    const [receipt, setReceipt] = useState({
        items: [],  // Array to hold the selected items with count and individual charges
        overallCharge: 0  // Total charge for all items
      });
    const [items, setItems] = useState([]);
    const [itemCounts, setItemCounts] = useState({});
    const [totalCharge, setTotalCharge] = useState(0);  // To track total charge
    const [totalItems, setTotalItems] = useState(0);    // To track total number of items added
    const location = useLocation();  // Get the state passed from Categories
    const { categoryName, userName } = location.state || {};  // Destructure categoryName from state
    

    const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get('/items/');
      setItems(response.data.data);
      
      // Initialize count state and total charges
      const counts = {};
      let initialTotalCharge = 0;
      let initialTotalItems = 0;

      response.data.data.forEach(item => {
        counts[item._id] = item.count;
        initialTotalCharge += item.count * item.charge;
        initialTotalItems += item.count;
      });

      setItemCounts(counts);
      setTotalCharge(initialTotalCharge);
      setTotalItems(initialTotalItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

 // Handle increment
const handleIncrement = (itemId) => {
    const updatedCounts = {
      ...itemCounts,
      [itemId]: itemCounts[itemId] + 1
    };
  
    // Find the item being incremented
    const incrementedItem = items.find(item => item._id === itemId);
  
    // Calculate new total for the item
    const updatedReceiptItems = receipt.items.map((item) => 
      item._id === itemId 
        ? { ...item, count: item.count + 1, totalCharge: (item.count + 1) * item.charge } 
        : item
    );
  
    // If item is not in receipt, add it
    if (!receipt.items.some(item => item._id === itemId)) {
      updatedReceiptItems.push({ 
        _id: itemId, 
        itemName: incrementedItem.itemName, 
        count: 1, 
        charge: incrementedItem.charge, 
        totalCharge: incrementedItem.charge 
      });
    }
  
    // Update total charge and overall charge
    setTotalCharge(totalCharge + incrementedItem.charge);
    setTotalItems(totalItems + 1);
  
    setItemCounts(updatedCounts);
    
    // Update the receipt state
    setReceipt({
      ...receipt,
      items: updatedReceiptItems,
      overallCharge: totalCharge + incrementedItem.charge
    });
  };
  

  // Handle decrement
  // Handle decrement
const handleDecrement = (itemId) => {
    if (itemCounts[itemId] > 0) {
      const updatedCounts = {
        ...itemCounts,
        [itemId]: itemCounts[itemId] - 1
      };
  
      // Find the item being decremented
      const decrementedItem = items.find(item => item._id === itemId);
  
      // Update receipt for the decremented item
      const updatedReceiptItems = receipt.items
        .map(item => 
          item._id === itemId
            ? { ...item, count: item.count - 1, totalCharge: (item.count - 1) * item.charge }
            : item
        )
        .filter(item => item.count > 0);  // Remove the item if count goes to 0
  
      // Update total charge and total items
      setTotalCharge(totalCharge - decrementedItem.charge);
      setTotalItems(totalItems - 1);
  
      setItemCounts(updatedCounts);
  
      // Update the receipt state
      setReceipt({
        ...receipt,
        items: updatedReceiptItems,
        overallCharge: totalCharge - decrementedItem.charge
      });
    }
  };
  

  // Handle the proceed action to redirect to the next page
    const handleProceed = () => {
        const receipt = {
            items: items.filter(item => itemCounts[item._id] > 0).map(item => ({
              name: item.itemName,
              count: itemCounts[item._id],
              charge: item.charge * itemCounts[item._id],
            })),
            totalCharge,
        };
        
        navigate('/instructions');  // Redirect to the checkout or next page
        console.log(receipt);
    };
    useEffect(() => {
        // Store receipt in localStorage whenever it changes
        localStorage.setItem('receipt', JSON.stringify(receipt));
      }, [receipt]);

  return (
    <Container>
      <h1 className="text-center my-4">{categoryName}</h1>
      <Row>
        <h2>{ userName}, add items into your laundry bin : </h2>
        {items.map((item) => (
          <Col key={item._id} xs={12} md={4} lg={3} className="mb-4">
            <Card className="item-card">
              <Card.Img variant="top" src={item.image} alt={item.itemName} className="item-image" />
              <Card.Body>
                <Card.Title>{item.itemName}</Card.Title>
                <Card.Text>Charge: ₹{item.charge}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    className='decButton'
                    variant="secondary"
                    onClick={() => handleDecrement(item._id)}
                    disabled={itemCounts[item._id] <= 0}
                    
                  >
                    -
                  </Button>
                  <span>{itemCounts[item._id]}</span>
                  <Button className='incButton' variant="primary" onClick={() => handleIncrement(item._id)}>+ Add</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Proceed Button */}
      <div className="d-flex justify-content-end my-4">
        <Button variant="success" className="proceed-button" onClick={handleProceed}>
          <div className="proceed-button-left">
            <span>Total: ₹{totalCharge}</span> 
            <span> ({totalItems} items)</span>
          </div>
          <div className="proceed-button-right">
            Proceed →
          </div>
        </Button>
      </div>
    </Container>
  );
};

export default ItemsPage;

