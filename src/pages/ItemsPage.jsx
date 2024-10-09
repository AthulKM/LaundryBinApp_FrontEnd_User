// import React, { useState, useEffect } from 'react';
// import { Button, Card, Container, Row, Col } from 'react-bootstrap';
// import '../ItemsPage.css';  // Assuming this file holds the styles
// import axiosInstance from '../axios/axiosInstance';

// const ItemsPage = () => {
//   const [items, setItems] = useState([]);
//   const [itemCounts, setItemCounts] = useState({});  // To track the count of each item

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await axiosInstance.get('/items/');  // Adjust the URL as needed
//       setItems(response.data.data);
      
//       // Initialize count state for each item
//       const counts = {};
//       response.data.data.forEach(item => {
//         counts[item._id] = item.count;
//       });
//       setItemCounts(counts);
//     } catch (error) {
//       console.error('Error fetching items:', error);
//     }
//   };

//   // Handle increment
//   const handleIncrement = (itemId) => {
//     setItemCounts({
//       ...itemCounts,
//       [itemId]: itemCounts[itemId] + 1
//     });
//   };

//   // Handle decrement
//   const handleDecrement = (itemId) => {
//     setItemCounts({
//       ...itemCounts,
//       [itemId]: Math.max(itemCounts[itemId] - 1, 0)  // Ensure count doesn't go below 0
//     });
//   };

//   return (
//     <Container>
//       <h1 className="text-center my-4">Available Items</h1>
//       <Row>
//         {items.map((item) => (
//           <Col key={item._id} xs={12} md={4} lg={3} className="mb-4">
//             <Card className="item-card">
//               <Card.Img variant="top" src={item.image} alt={item.itemName} className="item-image" />
//               <Card.Body>
//                 <Card.Title>{item.itemName}</Card.Title>
//                 <Card.Text>Charge: ₹{item.charge}</Card.Text>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <Button
//                     variant="secondary"
//                     onClick={() => handleDecrement(item._id)}
//                     disabled={itemCounts[item._id] <= 0}
//                   >
//                     -
//                   </Button>
//                   <span>{itemCounts[item._id]}</span>
//                   <Button variant="primary" onClick={() => handleIncrement(item._id)}>+ Add</Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default ItemsPage;


import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import '../ItemsPage.css';  // Assuming this file holds the styles
import axiosInstance from '../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const [totalCharge, setTotalCharge] = useState(0);  // To track total charge
  const [totalItems, setTotalItems] = useState(0);    // To track total number of items added

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

    // Update total charge and total items
    setTotalCharge(totalCharge + incrementedItem.charge);
    setTotalItems(totalItems + 1);
    
    setItemCounts(updatedCounts);
  };

  // Handle decrement
  const handleDecrement = (itemId) => {
    if (itemCounts[itemId] > 0) {
      const updatedCounts = {
        ...itemCounts,
        [itemId]: itemCounts[itemId] - 1
      };

      // Find the item being decremented
      const decrementedItem = items.find(item => item._id === itemId);

      // Update total charge and total items
      setTotalCharge(totalCharge - decrementedItem.charge);
      setTotalItems(totalItems - 1);

      setItemCounts(updatedCounts);
    }
  };

  // Handle the proceed action to redirect to the next page
  const handleProceed = () => {
    navigate('/instructions');  // Redirect to the checkout or next page
  };

  return (
    <Container>
      <h1 className="text-center my-4">Available Items</h1>
      <Row>
        {items.map((item) => (
          <Col key={item._id} xs={12} md={4} lg={3} className="mb-4">
            <Card className="item-card">
              <Card.Img variant="top" src={item.image} alt={item.itemName} className="item-image" />
              <Card.Body>
                <Card.Title>{item.itemName}</Card.Title>
                <Card.Text>Charge: ₹{item.charge}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="secondary"
                    onClick={() => handleDecrement(item._id)}
                    disabled={itemCounts[item._id] <= 0}
                  >
                    -
                  </Button>
                  <span>{itemCounts[item._id]}</span>
                  <Button variant="primary" onClick={() => handleIncrement(item._id)}>+ Add</Button>
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

