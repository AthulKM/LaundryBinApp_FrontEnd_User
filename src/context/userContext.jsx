
import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);

  return (
    <UserContext.Provider value={{ userName, setUserName, id, setId }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
