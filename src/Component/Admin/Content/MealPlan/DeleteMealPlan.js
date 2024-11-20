import { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteMealPlan = ({ show, setShow, mealPlanId, onDelete }) => {
  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token'); // Ensure the token is stored under 'token'

    try {
      // Send delete request with the token in the Authorization header
      await axios.delete(`http://localhost:8080/mealPlans/delete/${mealPlanId}`, {
        headers: {
          'Authorization': `Bearer ${token}`  // Add the token here
        }
      });

      toast.success('Meal plan deleted successfully!');
      handleClose();
      onDelete();  // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      toast.error('Failed to delete meal plan');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Delete Meal Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this meal plan?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteMealPlan;
