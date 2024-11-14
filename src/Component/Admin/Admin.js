import React, { useState } from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import { Outlet } from "react-router-dom";
import './Admin.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='admin-container'>
            <div className={`admin-sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
                <SideBar toggleSidebar={handleSidebarToggle} isOpen={isSidebarOpen} />
            </div>
            <div className='admin-content'>
                <div className='admin-navbar'>
                    <NavBar />
                </div>
                <div className='admin-main'>
                    <Outlet />
                </div>
            </div>
                <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                <ToastContainer />
        </div>
    );
};

export default Admin;
