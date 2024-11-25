import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css'; // Import CSS của ProSidebar
import { Link } from 'react-router-dom';
import img from '../../assets/image/user.png';
import './SideBar.scss';

const SideBar = ({ isOpen, toggleSidebar }) => {
    const [isFeedBackOpen, setFeedBackOpen] = useState(false);

    const handleFeedBackToggle = () => {
        setFeedBackOpen(prevState => !prevState);
    };

    return (
        <ProSidebar className={`sidebar-container ${isOpen ? 'open' : 'closed'}`} collapsed={!isOpen}>
            <div className="profile-section">
                <div className="profile-info" onClick={toggleSidebar}>
                    <img src={img} alt="Profile" className="profile-image" />
                    <p className="profile-name">Admin</p>
                </div>
            </div>
            <Menu iconShape="circle">
                <MenuItem icon={<i className="fa fa-book fa-2x"></i>}>
                    <Link to="/Admins/Exercise" className="nav-text">Exercise</Link>
                </MenuItem>
                <MenuItem icon={<i className="fa fa-lemon-o fa-2x"></i>}>
                    <Link to="/Admins/Food" className="nav-text">Food</Link>
                </MenuItem>

                <SubMenu 
                    title="Meal & Program" 
                    icon={<i className="fa fa-cutlery fa-2x"></i>}
                    className="submenu"
                >
                    <MenuItem icon={<i className="fa fa-tasks fa-2x"></i>}>
                        <Link to="/Admins/MealPlan" className="nav-text">Meal Plan</Link>
                    </MenuItem>
                    <MenuItem icon={<i className="fa fa-tasks fa-2x"></i>}>
                        <Link to="/Admins/Program" className="nav-text">Program</Link>
                    </MenuItem>
                </SubMenu>

                <SubMenu 
                    title="Feedback" 
                    icon={<i className="fa fa-map-marker fa-2x"></i>}
                    open={isFeedBackOpen}
                    onClick={handleFeedBackToggle}
                    className="submenu feedback"
                >
                    <MenuItem icon={<i className="fa fa-map-marker fa-2x"></i>}>
                        <Link to="/Admins/FeedBackMealPlan" className="nav-text">Feedback Meal Plan</Link>
                    </MenuItem>
                    <MenuItem icon={<i className="fa fa-map-marker fa-2x"></i>}>
                        <Link to="/Admins/FeedBackProgram" className="nav-text">Feedback Program</Link>
                    </MenuItem>
                </SubMenu>

                <MenuItem icon={<i className="fa fa-calendar fa-2x"></i>}>
                    <Link to="#" className="nav-text">Calendar</Link>
                </MenuItem>
                <MenuItem icon={<i className="fa fa-male fa-2x"></i>}>
                    <Link to="#" className="nav-text">Client Tracking</Link>
                </MenuItem>
                {/* <MenuItem icon={<i className="fa fa-credit-card fa-2x"></i>}>
                    <Link to="#" className="nav-text">Training Package Of Client</Link>
                </MenuItem>
                <MenuItem icon={<i className="fa fa-money fa-2x"></i>}>
                    <Link to="#" className="nav-text">Training Package</Link>
                </MenuItem>

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
        </ProSidebar>
    );
};

export default SideBar;
