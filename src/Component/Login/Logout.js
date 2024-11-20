import React from 'react';
import { toast } from 'react-toastify';
import './Modal.scss'

const Logout = ({ showModal, handleClose, handleLogout }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-conten">
        <h2>Xác nhận đăng xuất</h2>
        <p>Bạn có chắc muốn đăng xuất không?</p>
        <div className="modal-actions">
          <button onClick={handleClose} className="btn btn-secondary">
            Hủy
          </button>
          <button
            onClick={() => {
              handleLogout(); // Gọi handleLogout khi xác nhận
              handleClose(); // Đóng modal
            }}
            className="btn btn-primary"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
