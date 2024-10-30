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
                    <li><button variant="primary" onClick={() => navigate('/dashboard')}>
                    Dashboard
                    </button></li>
                    <li><button variant="primary" onClick={() => navigate('/profile', { state: { userData } })}>
                    Profile
                    </button></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                ) : (
                        <ul className='navbar-links'>
                            <li><button onClick={() => navigate('/login')}>Login</button></li>
                        </ul>
                    

                )}
            
        </nav>
    );
};

export default NavBar;
