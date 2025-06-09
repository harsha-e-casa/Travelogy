// src/api/apiAdapter.js
import axios from 'axios';
import { useContext } from 'react'
import Cookies from 'js-cookie';

// You can store the API base URL in an environment variable
// const API_BASE_URL   =   process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
const API_BASE_URL = 'http://localhost:3030';
const API_TEST_JACK = 'https://apitest.tripjack.com/';
const apiKey = '412605c3683c38-96bd-45b6-ae06-02e22a8be1b1';

// const parameter = {
//   "searchQuery": {
//       "cabinClass": "ECONOMY",
//       "paxInfo": {
//           "ADULT": 1,
//           "CHILD": 1,
//           "INFANT": 1
//       },
//       "routeInfos": [
//           {
//               "fromCityOrAirport": {
//                   "code": "DEL"
//               },
//               "toCityOrAirport": {
//                   "code": "BOM"
//               },
//               "travelDate": "2025-04-18"
//           }
//       ],
//       "searchModifiers": {}
//   }
// }

// Backend End API
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  // timeout: 5000, // adjust timeout as necessary
});

// TripJack APi

const apiInstanceTripJack = axios.create({
  baseURL: API_TEST_JACK,
  headers: {
    'Content-Type': 'application/json',
    'apikey': apiKey,
  },
  // timeout: 5000, // adjust timeout as necessary
});


// Optional: Add interceptors to handle logging, errors globally, etc.
apiInstance.interceptors.request.use(
  (config) => {
    // Perform any request modifications here (e.g., adding auth tokens)
    // config.headers.Authorization = `Bearer ${yourAuthToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors uniformly, optionally log them
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Define adapter functions for common API calls

/**
 * Fetch data from a given endpoint using a GET request.
 *
 * @param {string} endpoint - The API endpoint (relative to the base URL)
 * @param {object} params - Optional query parameters
 * @returns {Promise<object>} - The response data
 */
export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await apiInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    // You can handle specific error cases or rethrow the error
    throw error;
  }
};

/**
 * Send data to a given endpoint using a POST request.
 *
 * @param {string} endpoint - The API endpoint (relative to the base URL)
 * @param {object} payload - The data to send in the request body
 * @returns {Promise<object>} - The response data
 */
export const postData = async (endpoint, payload) => {
  try {
    const response = await apiInstance.post(endpoint, payload);
    console.log("ressssssssss 1111111 ",response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const postDataApiCall = async (url, parameter) => {
//   // travelogy/flight/search
//   try {
//     const response = await apiInstanceTripJack.post(url, parameter);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

// TripJack API Sections Start


export const postDataTJ = async (parameter) => {

  try {


    // let adults = getCookie('gy_adult')
    // let children = getCookie('gy_child')
    // let cabinType = getCookie('gy_class')
    // let departDate = getCookie('gy_trd')


    //     const parameter = {
    //       "searchQuery": {
    //           "cabinClass": "PREMIUM_ECONOMY",
    //           "paxInfo": {
    //               "ADULT": Cookies.get('gy_adult'),
    //               "CHILD": Cookies.get('gy_child'),
    //               "INFANT": 0
    //           },
    //           "routeInfos": [
    //               {
    //                   "fromCityOrAirport": {
    //                       "code": Cookies.get('gy_aa')
    //                   },
    //                   "toCityOrAirport": {
    //                       "code": Cookies.get('gy_da')
    //                   },
    //                   "travelDate": Cookies.get('gy_trd'),
    //               }
    //           ],
    //           "searchModifiers": {
    //             // "pfts": [
    //             //     "REGULAR"
    //             // ],
    //             // "isDirectFlight": false,
    //             // "isConnectingFlight": false,
    //             // "sourceId": 0,
    //             // "pnrCreditInfo": {
    //             //     "pnr": ""
    //             // },
    //             // "iiss": false
    //         }
    //       }
    //     }
    // console.log(parameter);

    const response = await apiInstanceTripJack.post('fms/v1/air-search-all', parameter);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const postDataTJBookingAir = async (parameter) => {
  try {
    const response = await apiInstanceTripJack.post('oms/v1/air/book', parameter);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const postDataTJBookingDetails = async (parameter) => {

  try {
    const response = await apiInstanceTripJack.post('oms/v1/booking-details', parameter);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const postDataFlightDetails = async (parameter) => {

  try {
    const response = await apiInstanceTripJack.post('fms/v1/review', parameter);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postDataFareDetails = async (parameter) => {

  try {
    const response = await apiInstanceTripJack.post('fms/v2/farerule', parameter);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postDataBookingDetails = async (parameter) => {

  try {
    const response = await apiInstanceTripJack.post('oms/v1/booking-details', parameter);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postAirDataBookingDetails = async (parameter) => {

  try {
    const response = await apiInstanceTripJack.post('oms/v1/confirm-book', parameter);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//  fare-validate
export const postFareValidate = async (parameter) => {

  try {
    const response = await apiInstanceTripJack.post('oms/v1/air/fare-validate', parameter);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postUnHold = async (parameter) => {

  try {
    const response = await apiInstanceTripJack.post('oms/v1/air/unhold', parameter);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Add additional functions as needed (PUT, DELETE, etc.)

export default { apiInstanceTripJack, apiInstance };
