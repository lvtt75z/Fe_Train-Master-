import { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteProgram = ({ show, setShow, programId, onDelete }) => {
  const handleClose = () => setShow(false);

  const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No token found! Please log in.');
        return;
      }

      // Dùng token trong header để phân quyền
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

  const handleDelete = async () => {

    try {
      // Send a delete request for the program to the backend
      await axios.delete(`http://localhost:8080/programs/delete/${programId}`,config);
      toast.success('Program deleted successfully!');
      handleClose();
      onDelete();  // Refresh data after a successful deletion
    } catch (error) {
      console.error('Error deleting program:', error);
      toast.error('Failed to delete program');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Delete Program</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this program?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProgram;
