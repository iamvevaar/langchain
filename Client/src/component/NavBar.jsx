import React, { useState, useEffect } from 'react';
import './Custom.css';
import image1 from "../assets/Frame.png";
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false); // New state for dropdown visibility

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const toggleNavExpanded = () => {
        setIsNavExpanded(!isNavExpanded);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // Toggle the visibility of the dropdown menu
    };

    const logout = () => {
        localStorage.removeItem('user'); // Clear user data from localStorage
        setUser(null); // Update state to reflect that user has logged out
        setShowDropdown(false);
        navigate("/Login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ width: "96rem", marginLeft: "-8rem" }}>
            <div className="container-fluid">
                <a className="navbar-brand ms-5" href="#home">
                    <img src={image1} alt="" style={{ width: "36px", height: "36px" }} />
                </a>
                <button className="navbar-toggler" type="button" onClick={toggleNavExpanded} aria-controls="navbarNav" aria-expanded={isNavExpanded} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavExpanded ? 'show' : ''} collapse navbar-collapse`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#action1">Merge PDF</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#action2">PDF Converter</a>
                        </li>
                    </ul>
                    {user ? (
                        <>
                            <img src={user.photoURL} alt="Profile" style={{ width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer" }} onClick={toggleDropdown} />
                            {showDropdown && (
                                <label className="dropdown-menu" style={{ position: 'absolute', right: 0, top: "3rem", display: 'block' }}>
                                    <label className="dropdown-item" onClick={logout}>Logout</label>
                                </label>
                            )}
                        </>
                    ) : (
                        <>
                            <button className="button me-2" href="#login">Login</button>
                            <button className="button" href="#signin">Sign In</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
