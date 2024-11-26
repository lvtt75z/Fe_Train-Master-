import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeleteTracking({ trackingId, onDelete }) {
  const [show, setShow] = useState(false);

  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`http://localhost:8080/clientstracking/${trackingId}`);
      toast.success('Tracking deleted successfully');
      onDelete(trackingId); // Thông báo cho parent để cập nhật danh sách
      setShow(false); // Đóng modal
    } catch (error) {
      console.error('Lỗi khi xóa tracking:', error);
      toast.error('Xóa tracking thất bại');
    }
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShow(true)}>
        Delete
      </Button>

      <Modal show={show} onHide={() => setShow(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete Tracking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn xóa bản ghi tracking này không?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteTracking;
