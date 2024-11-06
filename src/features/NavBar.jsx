// NavBar.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../NavBar.css';
import { useAuth } from '../context/AuthContext.jsx';
import { useUser } from '../context/userContext.jsx';

const NavBar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, setIsAuthenticated } = useAuth();
    const { userName, id, setUserName, setId, userData } = useUser();

    useEffect(() => {
        // Check local storage for user data
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserName(parsedUser.username); // Set username if available
            setIsAuthenticated(true); // Set authentication status
        }
    }, [setUserName, setIsAuthenticated]);

    const handleLogout = () => {
        logout();
        setUserName(null);
        setId(null);
        setIsAuthenticated(false);
        navigate('/landing');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/landing">LaundryBin</Link>
            </div>
            
                
                {/* <li><Link to="/contact">Contact</Link></li> */}
            {isAuthenticated ? (
                <ul className="navbar-links">
                    <li>
                        <button variant="primary" onClick={() => navigate('/order')}>
                        {/* Orders */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 8.5L12 3 3 8.5l9 5.5 9-5.5z" fill="white"/>
                                <path d="M12 21V14M3 8.5l9 5.5 9-5.5M5.5 10.5l-2-1.5v8.5l9 5.5 9-5.5V9L18.5 10.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                        </button>
                    </li>
                    <li><button variant="primary" onClick={() => navigate('/notifications')}>
                        {/* Notifications */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell">
                            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>

                    </button></li>
                    <li><button variant="primary" onClick={() => navigate('/dashboard')}>
                        {/* Dashboard */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
   
                    </button></li>
                    <li><button variant="primary" onClick={() => navigate('/profile', { state: { userData } })}>
                        {/* Profile */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button></li>
                    <li><button onClick={handleLogout}>
                        {/* Logout */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 21H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>

                    </button></li>
                    </ul>
                ) : (
                        <ul className='navbar-links'>
                        <li><button onClick={() => navigate('/login')}>
                            {/* Login */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M15 3H21a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"></path>
                                <polyline points="10 17 15 12 10 7"></polyline>
                                <line x1="15" y1="12" x2="3" y2="12"></line>
                            </svg>

                        </button></li>
                        </ul>
                    

                )}
            
        </nav>
    );
};

export default NavBar;
