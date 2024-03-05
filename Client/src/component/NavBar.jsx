import React, { useState, useEffect, useRef } from 'react';
import './Custom.css';
import image1 from "../assets/Frame.png";
import { useNavigate } from 'react-router-dom';
import Shimmer from './Shimmer/Shimmer';

const Header = () => {

    const navigate = useNavigate();
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false); // New state for dropdown visibility

    const dropdownRef = useRef(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        const checkIfClickedOutside = e => {
            if (showDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [showDropdown]);

    const toggleNavExpanded = () => {
        setIsNavExpanded(!isNavExpanded);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // Toggle the visibility of the dropdown menu
    };

    const logout = () => {
        localStorage.removeItem('user'); // Clear user data from localStorage
        setUser(null);
        setShowDropdown(false);
        navigate("/Login");
    };

    const handleShimmerClick = () => {
        console.log("i amshimmer");
        navigate("/Ask");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ width: "95.49rem", marginLeft: "-8rem" }}>
            <div className="container-fluid">
                <a className="navbar-brand ms-5" href="#home">
                    <img src={image1} alt="" style={{ width: "36px", height: "36px" }} />
                </a>
                <button className="navbar-toggler" type="button" onClick={toggleNavExpanded} aria-controls="navbarNav" aria-expanded={isNavExpanded} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavExpanded ? 'show' : ''} collapse navbar-collapse`} id="navbarNav">
                    <ul className="navbar-nav ms-auto me-4">
                        <li className="nav-item ">
                            {/* <a className="nav-link" href="/Ask">Ask</a> */}
                            <Shimmer onClick={handleShimmerClick} />
                        </li>
                    </ul>
                    {user ? (
                        <div className='me-3' ref={dropdownRef} onClick={toggleDropdown} style={{cursor:"pointer"}} >
                            <span className="text-white ms-2 me-2">{user.email}</span>
                            <img src={user.photoURL} alt="Profile" style={{ width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer" }} onClick={toggleDropdown} />
                            {showDropdown && (
                                <div className="dropdown-menu" style={{ position: 'absolute', right: 0, top: "3rem", display: 'block' }}>
                                    <div className="dropdown-item" onClick={logout}>Logout</div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button className="button me-2" href="/Login">Login</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
