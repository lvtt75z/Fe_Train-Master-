import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Logout from '../Login/Logout';
import './NavBar.scss';

const NavBar = () => {
  const [showModal, setShowModal] = useState(false); // Quản lý trạng thái hiển thị modal
  const [username, setUsername] = useState(""); // State để lưu username
  const navigate = useNavigate();

  // Lấy username từ token
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const payload = storedToken.split('.')[1]; // Giải mã JWT (Lấy phần payload)
        const decodedPayload = JSON.parse(atob(payload)); // Giải mã base64

        setUsername(decodedPayload.sub); // Lấy username từ phần "sub" trong payload (thường là username)
      } catch (error) {
        console.error("Lỗi parse token:", error);
        setUsername(null); // Đặt username về null nếu token không hợp lệ
      }
    } else {
      console.warn("Không tìm thấy token trong localStorage");
      setUsername(null); // Nếu không có token thì username là null
    }
  }, []); // Chạy khi component mount

  const handleClose = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token khi đăng xuất
    navigate('/login'); // Điều hướng về trang login
  };

  const handleShowModal = () => {
    setShowModal(true); // Hiển thị modal khi nhấn logout
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Link to="/Admins/DashBoard" className="nav-link">Home</Link>
          <NavDropdown title={username ? username : "User"} id="basic-nav-dropdown">
            <Link to="/Admins/InfoUser" className="dropdown-item">Profile</Link>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleShowModal} className="btn btn-dark">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
      <Logout
        showModal={showModal}
        handleClose={handleClose}
        handleLogout={handleLogout}
      />
    </Navbar>
  );
};

export default NavBar;
