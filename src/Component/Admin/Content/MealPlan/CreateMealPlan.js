import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateMealPlanModal = ({ show, setShow, onAdd }) => {
  const [clientName, setClientName] = useState('');
  const [trainingStatus, setTrainingStatus] = useState(false);
  const [day, setDay] = useState('');
  const [session, setSession] = useState('');
  const [selectedFoodItems, setSelectedFoodItems] = useState([
    { foodName: '', protein: '', fat: '', carb: '', amount: '', note: '' }
  ]);
  const [clients, setClients] = useState([]); // Dữ liệu Client
  const [foods, setFoods] = useState([]); // Dữ liệu Food

  const handleClose = () => {
    setShow(false); // Chỉ đóng modal khi nhấn vào nút "Close"
  };

  // Lấy danh sách Clients và Foods từ API khi modal mở
  useEffect(() => {
    if (show) {
      axios.get('http://localhost:8080/client/getAllClient')
        .then(response => {
          setClients(response.data); // Cập nhật danh sách clients
        })
        .catch(error => {
          console.error("There was an error fetching clients!", error);
        });

      axios.get('http://localhost:8080/food/getAllFood')
        .then(response => {
          setFoods(response.data); // Cập nhật danh sách foods
        })
        .catch(error => {
          console.error("There was an error fetching foods!", error);
        });
    }
  }, [show]); // Chạy lại mỗi khi modal mở

  const addFoodItem = () => {
    setSelectedFoodItems([
      ...selectedFoodItems,
      { foodName: '', protein: '', fat: '', carb: '', amount: '', note: '' }
    ]);
  };

  const removeFoodItem = (index) => {
    const newFoodItems = selectedFoodItems.filter((_, i) => i !== index);
    setSelectedFoodItems(newFoodItems);
  };

  const handleFoodChange = (index, event) => {
    const values = [...selectedFoodItems];
    values[index][event.target.name] = event.target.value;
    setSelectedFoodItems(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mealPlanData = {
      clientName,
      trainingStatus,
      day,
      session,
      selectedFoodItems,
    };

    try {
      const response = await axios.post('http://localhost:8080/mealPlans/create', mealPlanData);
      if (response.status === 201) {
        onAdd(); // Refresh table or take action after successful creation
        toast.success('Meal Plan created successfully!');
        handleClose(); // Close modal after meal plan is created
      }
    } catch (error) {
      toast.error('Error creating Meal Plan');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size='xl' backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Create Meal Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="clientName">
            <Form.Label>Client Name:</Form.Label>
            <Form.Control
              as="select"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            >
              <option value="">Select a Client</option>
              {clients.map((client, index) => (
                <option key={index} value={client.firstName}>{client.firstName}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="trainingStatus">
            <Form.Label>Training Status:</Form.Label>
            <Form.Check
              type="checkbox"
              checked={trainingStatus}
              onChange={() => setTrainingStatus(!trainingStatus)}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="day">
            <Form.Label>Day:</Form.Label>
            <Form.Control
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="session">
            <Form.Label>Session:</Form.Label>
            <Form.Control
              as="select"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              required
            >
              <option>Choose session ... </option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </Form.Control>
          </Form.Group>

          <h3>Selected Food Items:</h3>
          {selectedFoodItems.map((food, index) => (
            <div key={index} className="food-item">
              <Form.Group controlId={`foodName-${index}`}>
                <Form.Label>Food Name:</Form.Label>
                <Form.Control
                  as="select"
                  name="foodName"
                  value={food.foodName}
                  onChange={(e) => handleFoodChange(index, e)}
                  required
                >
                  <option value="">Select a Food</option>
                  {foods.map((foodItem, i) => (
                    <option key={i} value={foodItem.foodName}>{foodItem.foodName}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId={`protein-${index}`}>
                <Form.Label>Protein:</Form.Label>
                <Form.Control
                  type="number"
                  name="protein"
                  value={food.protein}
                  onChange={(e) => handleFoodChange(index, e)}
                  required
                />
              </Form.Group>
              <Form.Group controlId={`fat-${index}`}>
                <Form.Label>Fat:</Form.Label>
                <Form.Control
                  type="number"
                  name="fat"
                  value={food.fat}
                  onChange={(e) => handleFoodChange(index, e)}
                  required
                />
              </Form.Group>
              <Form.Group controlId={`carb-${index}`}>
                <Form.Label>Carb:</Form.Label>
                <Form.Control
                  type="number"
                  name="carb"
                  value={food.carb}
                  onChange={(e) => handleFoodChange(index, e)}
                  required
                />
              </Form.Group>
              <Form.Group controlId={`amount-${index}`}>
                <Form.Label>Amount (grams):</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={food.amount}
                  onChange={(e) => handleFoodChange(index, e)}
                  required
                />
              </Form.Group>
              <Form.Group controlId={`note-${index}`}>
                <Form.Label>Note:</Form.Label>
                <Form.Control
                  type="text"
                  name="note"
                  value={food.note}
                  onChange={(e) => handleFoodChange(index, e)}
                />
              </Form.Group>
              <br></br>
              <Button variant="danger" type="button" onClick={() => removeFoodItem(index)}>
                Remove Food
              </Button>
            </div>
          ))}

          <br></br>
          <Button variant="secondary" type="button" onClick={addFoodItem}>
            Add Food Item
          </Button>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create Meal Plan
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateMealPlanModal;
