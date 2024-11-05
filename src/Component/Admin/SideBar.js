import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React, { useState } from 'react';
import img from '../../assets/image/gym.jpg'
import './SideBar.scss'
 
const SideBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="area"></div>
            <nav className={`main-menu ${isOpen ? 'expanded' : ''}`}>
                <div className="top-icon" onClick={toggleSidebar}>
                    <img src={img} alt="Profile" className="profile-image" />
                </div>

                <ul>
                    <li>
                        <a href="#">
                            <i className="fa fa fa-book fa-2x"></i>
                            <span className="nav-text">Excercise</span>
                        </a>
                    </li>
                    <li className="has-subnav">
                        <a href="#">
                            <i className="fa fa-lemon-o fa-2x"></i>
                            <span className="nav-text">Food</span>
                        </a>
                    </li>
                    <hr/>
                    <li className="has-subnav">
                        <a href="#">
                            <i className="fa fa fa-cutlery fa-2x"></i>
                            <span className="nav-text">MealPlan</span>
                        </a>
                    </li>
                    <li className="has-subnav">
                        <a href="#">
                            <i className="fa fa fa-tasks fa-2x"></i>
                            <span className="nav-text">Program</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-calendar fa-2x"></i>
                            <span className="nav-text">Calendar</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa fa-male fa-2x"></i>
                            <span className="nav-text">Client Tracking</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa fa-credit-card fa-2x"></i>
                            <span className="nav-text">Training Package Of Client</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-map-marker fa-2x"></i>
                            <span className="nav-text">FeedBack</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa fa-money fa-2x"></i>
                            <span className="nav-text">Training Package</span>
                        </a>
                    </li>
                    <hr/>
                    <li>
                        <a href="#">
                            <i className="fa fa fa-info-circle fa-2x"></i>
                            <span className="nav-text">Client Information</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa fa-info-circle fa-2x"></i>
                            <span className="nav-text">Person Trainer Information</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa fa-info-circle fa-2x"></i>
                            <span className="nav-text">Fitness Manager Information</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default SideBar;
