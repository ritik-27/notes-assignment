import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import './Navbar.css';
import noteContext from '../../context/notes/noteContext';


const Navbar = () => {
    const { userName, getUserDetails } = useContext(noteContext);
    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserDetails();
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success("Logged out successfully!");
        history.push('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light smart-navbar">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <i className="fas fa-book-open me-2"></i>
                    iNotebook
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`smart-nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`smart-nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>

                    {!localStorage.getItem('token') ? (
                        <div className="d-flex">
                            <Link className="custom-btn btn-secondary-custom mx-1" to="/login" role="button">Login</Link>
                            <Link className="custom-btn btn-primary-custom mx-1" to="/signup" role="button">Signup</Link>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center">
                            {userName && (
                                <div className="user-avatar">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <button style={{ width: '100px' }} onClick={handleLogout} className="custom-btn btn-primary-custom">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;