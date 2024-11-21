import React from 'react';
import img from '../../assets/image/user.png';
import './SideBar.scss';
import { Link } from 'react-router-dom';

const SideBar = ({ isOpen, toggleSidebar }) => {
    return (
        <div>
            <div className="area"></div>
            <nav className={`main-menu ${isOpen ? 'expanded' : 'collapsed'}`}>
                <div className="top-icon" onClick={toggleSidebar}>
                    <img src={img} alt="Profile" className="profile-image" />
                </div>

                <ul>
                    <li>
                        <Link to="/Admins/Exercise">
                            <i className="fa fa-book fa-2x"></i>
                            <span className="nav-text">Exercise</span>                        
                        </Link>
                    </li>
                    <li className="has-subnav">
                        <Link to="/Admins/Food">
                            <i className="fa fa-lemon-o fa-2x"></i>
                            <span className="nav-text">Food</span>
                        </Link>
                    </li>
                    <hr />
                    <li className="has-subnav">
                        <Link to="/Admins/MealPlan">
                            <i className="fa fa-cutlery fa-2x"></i>
                            <span className="nav-text">MealPlan</span>
                        </Link>
                    </li>
                    <li className="has-subnav">
                        <Link to="/Admins/Program">
                            <i className="fa fa-tasks fa-2x"></i>
                            <span className="nav-text">Program</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Admins/FeedBackMealPlan">
                            <i className="fa fa-map-marker fa-2x"></i>
                            <span className="nav-text">Feedback MealPlan</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Admins/FeedBackProgram">
                            <i className="fa fa-map-marker fa-2x"></i>
                            <span className="nav-text">Feedback Program</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <i className="fa fa-calendar fa-2x"></i>
                            <span className="nav-text">Calendar</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <i className="fa fa-male fa-2x"></i>
                            <span className="nav-text">Client Tracking</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <i className="fa fa-credit-card fa-2x"></i>
                            <span className="nav-text">Training Package Of Client</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <i className="fa fa-money fa-2x"></i>
                            <span className="nav-text">Training Package</span>
                        </Link>
                    </li>
                    <hr />
                    <li>
                        <Link to="#">
                            <i className="fa fa-info-circle fa-2x"></i>
                            <span className="nav-text">Client Information</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <i className="fa fa-info-circle fa-2x"></i>
                            <span className="nav-text">Personal Trainer Information</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <i className="fa fa-info-circle fa-2x"></i>
                            <span className="nav-text">Fitness Manager Information</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideBar;
