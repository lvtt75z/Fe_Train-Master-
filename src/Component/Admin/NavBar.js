import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavBar.scss';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logout from '../Login/Logout';

const NavBar = () => {
  const [showModal, setShowModal] = useState(false); // Quản lý trạng thái hiển thị modal
  const navigate = useNavigate();

  // Hàm đóng modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Hàm xử lý logout
  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');

    // Chuyển hướng về trang đăng nhập
    navigate('/login');
  };

  // Hàm hiển thị modal khi nhấn logout
  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Link to="/Admins/DashBoard" className="nav-link">Home</Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <Link to="/Admins/InfoAdmin" className="dropdown-item">Profile</Link>
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
}

export default NavBar;