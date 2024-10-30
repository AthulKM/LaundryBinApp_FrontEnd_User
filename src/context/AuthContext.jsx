import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        // Check for user and token in local storage on initialization
        const savedUser = JSON.parse(localStorage.getItem('userData'));
        const savedToken = localStorage.getItem('userToken');
        if (savedUser && savedToken) {
          setUser(savedUser);
          setAuthToken(savedToken);
        }
      }, []);


    const login = (user,token) => {
        setUser(user);
        setAuthToken(token);
        setIsAuthenticated(true);
        localStorage.setItem('userData', JSON.stringify(user));
        localStorage.setItem('userToken', token);
    }
    const logout = async () => {
        console.log(`Logging out user: ${user?.username || 'Guest'}`);
        
        // Clear user data from local storage
        localStorage.removeItem('userData');
        localStorage.removeItem('userToken');
        // Reset authentication state
        setIsAuthenticated(false);
        setUser(null);
        setAuthToken(null);
    };
    const updateUser = (updatedData) => {
        setUser(prevData => ({
            ...prevData,
            ...updatedData
        }));
        localStorage.setItem('userData', JSON.stringify(updatedData));
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated, login, logout, user, setUser, updateUser, setAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
