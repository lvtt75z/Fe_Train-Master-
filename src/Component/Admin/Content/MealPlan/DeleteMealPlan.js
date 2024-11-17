import { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteMealPlan = ({ show, setShow, mealPlanId, onDelete }) => {
  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    try {
      // Gửi request xóa meal plan từ backend
      await axios.delete(`http://localhost:8080/mealPlans/delete/${mealPlanId}`);
      toast.success('Meal plan deleted successfully!');
      handleClose();
      onDelete();  // Cập nhật lại dữ liệu sau khi xóa thành công
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
