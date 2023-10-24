import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from '../services/api.js';

export const Context = createContext(null);

export const Provider = ({ children } ) => {
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        // Fetch data from the API
        fetchData().then((data) => {
          setUserData(data);
        }).catch((error) => {
          // Handle errors
          console.error('Error fetching data:', error);
        });
      }, []);
    return (
        <Context.Provider value={userData}>
            { children }
        </Context.Provider>
    )
}