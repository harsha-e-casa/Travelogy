"use client"; // Required for client-side hooks like useState and useContext

import { createContext, useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import { postDataFlightDetails } from '@/services/NetworkAdapter';



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




    const [flightData,setFlightData]=useState(null)
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(null)
    const fetchFlightDetails = async (priceId) => {
       
       setError(null);
       setLoading(true)
   
       if (!priceId) {
         setError("Price ID is missing");
         setLoading(false)
         
         return;
       }
   
       try {
         const parameter = { priceIds: [priceId] };
        
   
         const data = await postDataFlightDetails(parameter);
         console.log("Flight detailsssss FOR REVIEW from context:", data);
         setFlightData(data)
    //      setFlightData({
    //       "tripInfos": [
    //           {
    //               "sI": [
    //                   {
    //                       "id": "789",
    //                       "fD": {
    //                           "aI": {
    //                               "code": "AI",
    //                               "name": "Air India",
    //                               "isLcc": false
    //                           },
    //                           "fN": "2412",
    //                           "eT": "32N"
    //                       },
    //                       "stops": 0,
    //                       "so": [],
    //                       "duration": 175,
    //                       "da": {
    //                           "code": "DEL",
    //                           "name": "Delhi Indira Gandhi Intl",
    //                           "cityCode": "DEL",
    //                           "city": "Delhi",
    //                           "country": "India",
    //                           "countryCode": "IN",
    //                           "terminal": "Terminal 3"
    //                       },
    //                       "aa": {
    //                           "code": "BLR",
    //                           "name": "Bengaluru Intl Arpt",
    //                           "cityCode": "BLR",
    //                           "city": "Bengaluru",
    //                           "country": "India",
    //                           "countryCode": "IN",
    //                           "terminal": "Terminal 2"
    //                       },
    //                       "dt": "2025-05-10T21:35",
    //                       "at": "2025-05-11T00:30",
    //                       "iand": true,
    //                       "isRs": false,
    //                       "sN": 0,
    //                       "ssrInfo": {
    //                           "MEAL": [
    //                               {
    //                                   "code": "VGML",
    //                                   "amount": 0,
    //                                   "desc": "Vegan Veg Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "AVML",
    //                                   "amount": 0,
    //                                   "desc": "Hindu Veg Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "VJML",
    //                                   "amount": 0,
    //                                   "desc": "Jain Veg Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "VLML",
    //                                   "amount": 0,
    //                                   "desc": "Lacto-Ovo Veg Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "FPML",
    //                                   "amount": 0,
    //                                   "desc": "Fruit Platter Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "NVML",
    //                                   "amount": 0,
    //                                   "desc": "Non-Veg Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "MOML",
    //                                   "amount": 0,
    //                                   "desc": "Moslem Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "HNML",
    //                                   "amount": 0,
    //                                   "desc": "Hindu Non-Veg Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "SFML",
    //                                   "amount": 0,
    //                                   "desc": "Sea Food Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "DBML",
    //                                   "amount": 0,
    //                                   "desc": "Diabetic Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "NLML",
    //                                   "amount": 0,
    //                                   "desc": "Low Lactose Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "CHML",
    //                                   "amount": 0,
    //                                   "desc": "Child Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "BBML",
    //                                   "amount": 0,
    //                                   "desc": "Baby Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "BLML",
    //                                   "amount": 0,
    //                                   "desc": "Bland Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "GFML",
    //                                   "amount": 0,
    //                                   "desc": "Gluten Intolerant Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "KSML",
    //                                   "amount": 0,
    //                                   "desc": "Kosher Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "LCML",
    //                                   "amount": 0,
    //                                   "desc": "Low Calorie Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "LFML",
    //                                   "amount": 0,
    //                                   "desc": "Low Fat Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "LSML",
    //                                   "amount": 0,
    //                                   "desc": "ow Salt Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "RVML",
    //                                   "amount": 0,
    //                                   "desc": "Vegetarian Raw Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "VOML",
    //                                   "amount": 0,
    //                                   "desc": "Vegetarian Oriental Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "SPML",
    //                                   "amount": 0,
    //                                   "desc": "Special Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "PFML",
    //                                   "amount": 0,
    //                                   "desc": "Peanut Free Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "ORML",
    //                                   "amount": 0,
    //                                   "desc": "Oriental Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "NSML",
    //                                   "amount": 0,
    //                                   "desc": "No Salt Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "PRML",
    //                                   "amount": 0,
    //                                   "desc": "Low Purine Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "LPML",
    //                                   "amount": 0,
    //                                   "desc": "Low Protein Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "HFML",
    //                                   "amount": 0,
    //                                   "desc": "High Fiber Meal",
    //                                   "iswca": false
    //                               },
    //                               {
    //                                   "code": "NFML",
    //                                   "amount": 0,
    //                                   "desc": "No Fish Meal",
    //                                   "iswca": false
    //                               }
    //                           ]
    //                       },
    //                       "ac": []
    //                   }
    //               ],
    //               "totalPriceList": [
    //                   {
    //                       "fd": {
    //                           "ADULT": {
    //                               "fC": {
    //                                   "TF": 13533,
    //                                   "TAF": 2048,
    //                                   "NF": 13533,
    //                                   "BF": 11485
    //                               },
    //                               "afC": {
    //                                   "TAF": {
    //                                       "YR": 170,
    //                                       "AGST": 1399,
    //                                       "OT": 479
    //                                   }
    //                               },
    //                               "sR": 9,
    //                               "bI": {
    //                                   "iB": "15KG",
    //                                   "cB": "7Kg"
    //                               },
    //                               "rT": 0,
    //                               "cc": "PREMIUM_ECONOMY",
    //                               "cB": "E",
    //                               "fB": "EU1PWDQI"
    //                           }
    //                       },
    //                       "fareIdentifier": "PUBLISHED",
    //                       "id": "R15-2-10-3743860810_0DELBLRAI2412~33210890034287930",
    //                       "messages": [],
    //                       "pc": {
    //                           "code": "AI",
    //                           "name": "Air India",
    //                           "isLcc": false
    //                       },
    //                       "fareRuleInformation": {
    //                           "fr": {},
    //                           "tfr": {
    //                               "NO_SHOW": [
    //                                   {
    //                                       "policyInfo": "Not Applicable",
    //                                       "pp": "BEFORE_DEPARTURE"
    //                                   }
    //                               ],
    //                               "CANCELLATION": [
    //                                   {
    //                                       "amount": 3500,
    //                                       "policyInfo": "Available with Penalty",
    //                                       "fcs": {
    //                                           "ACFT": 0,
    //                                           "ACF": 3500
    //                                       },
    //                                       "pp": "BEFORE_DEPARTURE"
    //                                   }
    //                               ],
    //                               "DATECHANGE": [
    //                                   {
    //                                       "amount": 2500,
    //                                       "policyInfo": "Available with Penalty",
    //                                       "fcs": {
    //                                           "ARFT": 0,
    //                                           "ARF": 2500
    //                                       },
    //                                       "pp": "BEFORE_DEPARTURE"
    //                                   }
    //                               ]
    //                           }
    //                       }
    //                   }
    //               ],
    //               "airFlowType": "SEARCH"
    //           }
    //       ],
    //       "alerts": [
    //           {
    //               "oldFare": 12133,
    //               "newFare": 13533,
    //               "type": "FAREALERT"
    //           }
    //       ],
    //       "searchQuery": {
    //           "routeInfos": [
    //               {
    //                   "fromCityOrAirport": {
    //                       "code": "DEL",
    //                       "name": "Delhi Indira Gandhi Intl",
    //                       "cityCode": "DEL",
    //                       "city": "Delhi",
    //                       "country": "India",
    //                       "countryCode": "IN"
    //                   },
    //                   "toCityOrAirport": {
    //                       "code": "BLR",
    //                       "name": "Bengaluru Intl Arpt",
    //                       "cityCode": "BLR",
    //                       "city": "Bengaluru",
    //                       "country": "India",
    //                       "countryCode": "IN"
    //                   },
    //                   "travelDate": "2025-05-10"
    //               }
    //           ],
    //           "cabinClass": "PREMIUM_ECONOMY",
    //           "paxInfo": {
    //               "ADULT": 1,
    //               "CHILD": 0,
    //               "INFANT": 0
    //           },
    //           "requestId": "3743860810",
    //           "searchType": "ONEWAY",
    //           "searchModifiers": {
    //               "isDirectFlight": false,
    //               "isConnectingFlight": false,
    //               "pft": "REGULAR",
    //               "pfts": [
    //                   "REGULAR"
    //               ]
    //           },
    //           "isDomestic": true
    //       },
    //       "bookingId": "TJS101901435904",
    //       "totalPriceInfo": {
    //           "totalFareDetail": {
    //               "fC": {
    //                   "TF": 13533,
    //                   "TAF": 2048,
    //                   "NF": 13533,
    //                   "BF": 11485
    //               },
    //               "afC": {
    //                   "TAF": {
    //                       "YR": 170,
    //                       "AGST": 1399,
    //                       "OT": 479
    //                   }
    //               }
    //           }
    //       },
    //       "status": {
    //           "success": true,
    //           "httpStatus": 200
    //       },
    //       "conditions": {
    //           "ffas": [
    //               "AI"
    //           ],
    //           "isa": false,
    //           "dob": {
    //               "adobr": false,
    //               "cdobr": false,
    //               "idobr": true
    //           },
    //           "iecr": false,
    //           "dc": {
    //               "ida": false,
    //               "idm": false,
    //               "iqpe": false
    //           },
    //           "ipa": false,
    //           "addOns": {
    //               "isbpa": false
    //           },
    //           "iss": false,
    //           "isBA": true,
    //           "st": 900,
    //           "sct": "2025-05-09T10:57:56.051",
    //           "gst": {
    //               "gstappl": true,
    //               "igm": false
    //           }
    //       }}
    // ); // Update state with flight details
       } catch (err) {
         console.error("error caused", err);
     
         if (err?.response?.data?.errors?.length) {
           const firstError = err.response.data.errors[0];
           const message = firstError?.message || 'An unknown error occurred.';
           const details = firstError?.details ? ` - ${firstError.details}` : '';
           setError(`${message}`);
     
           console.log("API error message:", message);
           console.log("Error details:", details);
           console.log("Error status code:", err.response.status);
         } else if (err?.message) {
           setError(err.message);
           console.log("Generic error message:", err.message);
         } else {
           setError("Something went wrong. Please try again.");
         }
       } 
     };
     useEffect(() => {
      if (flightData) {
        const timeout = setTimeout(() => {
          setLoading(false);
        }, 100); // small delay to ensure DOM updates
    
        return () => clearTimeout(timeout);
      }
    }, [flightData]);
     
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
      updatephone,
      flightData,
      fetchFlightDetails,
      setFlightData,
      error,
      loading,
      setLoading,
      setError}}>
      {children}
    </AppContext.Provider>
  );
}
