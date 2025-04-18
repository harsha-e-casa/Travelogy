"use client"; // Required for client-side hooks like useState and useContext

import { createContext, useState } from 'react';
import Cookies from 'js-cookie';


// Create a context for your application state
export const AppContext = createContext();

// Create a provider component
export function AppContextProvider({ children }) {
  const [value, setValue] = useState("Initial Value");

  // Function to update the global state
  const updateValue = (newValue) => {
    setValue('karthik');
  };


    // Set a cookie
    const setCookie = (keyname, values) => {
        removeCookie(keyname);
        Cookies.set(keyname, values);
      };
    
    // Get the cookie
    const getCookie = (keyname) => {
        return Cookies.get(keyname);
        // alert(`Cookie retrieved: ${data_gy}`);
    };
    
      // Remove the cookie
    const removeCookie = (keyname) => {
        Cookies.remove(keyname);
        console.log(`Cookie removed: ${keyname}`);
    };

      

  return (
    <AppContext.Provider value={{ value, updateValue, setCookie, getCookie }}>
      {children}
    </AppContext.Provider>
  );
}
