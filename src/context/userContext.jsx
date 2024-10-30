
import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);
  const [userData, setUserData] = useState(null);
  

  

  


  return (
    <UserContext.Provider value={{ userName, setUserName, id, setId, userData, setUserData}}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
