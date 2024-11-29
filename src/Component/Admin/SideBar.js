import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css'; // Import CSS của ProSidebar
import img from '../../assets/image/admin.png';
import './SideBar.scss';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logout from '../Login/Logout';

const SideBar = ({ isOpen, toggleSidebar }) => {
    const [isFeedBackOpen, setFeedBackOpen] = useState(false);
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
    const handleFeedBackToggle = () => {
        setFeedBackOpen(prevState => !prevState);
    };

    return (
        <ProSidebar className={`sidebar-container ${isOpen ? 'open' : 'closed'}`} collapsed={!isOpen}>
            <div className="profile-section">
                <div className="profile-info" onClick={toggleSidebar}>
                    <img src={img} alt="Profile" className="profile-image" />
                </div>
            </div>
            <Menu iconShape="circle">
                <MenuItem icon={<i className="fa fa-book fa-2x"></i>} style={{ marginBottom: 30 }}>
                    <Link to="/Admins/Exercise" className="nav-text">Exercise</Link>
                </MenuItem>
                <MenuItem icon={<i className="fa fa-lemon-o fa-2x"></i>} style={{ marginBottom: 30 }}>
                    <Link to="/Admins/Food" className="nav-text">Food</Link>
                </MenuItem>

                <SubMenu
                    title="Meal & Program"
                    icon={<i className="fa fa-cutlery fa-2x"></i>}
                    className="submenu"
                    style={{ marginBottom: 30 }}
                >
                    <MenuItem icon={<i className="fa fa-tasks fa-2x"></i>} style={{ marginBottom: 2 }}>
                        <Link to="/Admins/MealPlan" className="nav-text">Meal Plan</Link>
                    </MenuItem>
                    <MenuItem icon={<i className="fa fa-tasks fa-2x"></i>} style={{ marginBottom: 2 }}>
                        <Link to="/Admins/Program" className="nav-text">Program</Link>
                    </MenuItem>
                </SubMenu>

                <SubMenu
                    title="Feedback"
                    icon={<i className="fa fa-map-marker fa-2x"></i>}
                    open={isFeedBackOpen}
                    onClick={handleFeedBackToggle}
                    className="submenu feedback"
                    style={{ marginBottom: 30 }}
                >
                    <MenuItem icon={<i className="fa fa-map-marker fa-2x"></i>} style={{ marginBottom: 2 }}>
                        <Link to="/Admins/FeedBackMealPlan" className="nav-text">Feedback Meal Plan</Link>
                    </MenuItem>
                    <MenuItem icon={<i className="fa fa-map-marker fa-2x"></i>} style={{ marginBottom: 2 }}>
                        <Link to="/Admins/FeedBackProgram" className="nav-text">Feedback Program</Link>
                    </MenuItem>
                </SubMenu>

                <MenuItem icon={<i className="fa fa-calendar fa-2x"></i>} style={{ marginBottom: 30 }}>
                    <Link to="#" className="nav-text">Calendar</Link>
                </MenuItem>
                <MenuItem icon={<i className="fa fa-male fa-2x"></i>} style={{ marginBottom: 60 }}>
                    <Link to="/Admins/ClientTracking" className="nav-text">Client Tracking</Link>
                </MenuItem>
                <MenuItem icon={<i className="fa fa-user fa-2x"></i>}>
                    <Link to="/Admins/InfoUser" className="nav-text">Profile</Link>
                </MenuItem>
                <MenuItem icon={<i className="fa fa-sign-out fa-2x"></i>} onClick={handleShowModal}>
                    Logout
                </MenuItem>
                {/*
                <SubMenu title="Client Information" icon={<i className="fa fa-info-circle fa-2x"></i>}>
                    <MenuItem icon={<i className="fa fa-info-circle fa-2x"></i>}>
                        <Link to="#" className="nav-text">Client Information</Link>
                    </MenuItem>
                    <MenuItem icon={<i className="fa fa-info-circle fa-2x"></i>}>
                        <Link to="#" className="nav-text">Personal Trainer Information</Link>
                    </MenuItem>
                    <MenuItem icon={<i className="fa fa-info-circle fa-2x"></i>}>
                        <Link to="#" className="nav-text">Fitness Manager Information</Link>
                    </MenuItem>
                </SubMenu> */}
            </Menu>
            <Logout
                showModal={showModal}
                handleClose={handleClose}
                handleLogout={handleLogout}
            />
        </ProSidebar>
    );
};

export default SideBar;
