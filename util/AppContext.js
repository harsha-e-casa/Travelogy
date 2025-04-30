"use client"; // Required for client-side hooks like useState and useContext

import { createContext, useState,useEffect } from 'react';
import Cookies from 'js-cookie';



// Create a context for your application state
export const AppContext = createContext();

// Create a provider component
export function AppContextProvider({ children }) {
  const [value, setValue] = useState("Initial Value");
  const [travelerInfo, setTravelerInfo] = useState(null);
  const[email,setemail]=useState(null)
  const[number,setnumber]=useState(null)

  // Function to update the global traveler info
  const updateTravelerInfo = (newInfo) => {
    setTravelerInfo(newInfo);

    // Store traveler information in cookies as a JSON string
    setCookie('travelerInfo', JSON.stringify(newInfo));
  };
  const updatephone=(newInfo)=>{
   setnumber(newInfo)
   setCookie("number",JSON.stringify(newInfo))
  }
  const updateemail=(newInfo)=>{
setemail(newInfo)
setCookie("email",JSON.stringify(newInfo))
  }
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

    useEffect(() => {
      const storedTravelerInfo = getCookie('travelerInfo');
      if (storedTravelerInfo) {
        setTravelerInfo(JSON.parse(storedTravelerInfo)); // Parse the JSON string into an object
      }
    }, []);
    useEffect(() => {
      const storedemail = getCookie('email');
      if (storedemail) {
        setemail(storedemail); // Parse the JSON string into an object
      }
    }, []);
    useEffect(() => {
      const storednumber = getCookie('number');
      if (storednumber) {
        setnumber(storednumber); // Parse the JSON string into an object
      }
    }, []);


  return (
    <AppContext.Provider value={{  value,
      updateValue,
      setCookie,
      getCookie,
      travelerInfo,
      updateTravelerInfo,
      email,
      number,
      updateemail,
      updatephone }}>
      {children}
    </AppContext.Provider>
  );
}
