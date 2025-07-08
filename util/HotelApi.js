// utils/hotelApi.js

import axios from "axios";

// API function to fetch hotel review data
export const fetchHotelReviewData = async (hotelId, optionId) => {
  const API_URL = "https://apitest.tripjack.com/hms/v1/hotel-review";
  const API_KEY = "412605c3683c38-96bd-45b6-ae06-02e22a8be1b1";

  try {
    const response = await axios.post(
      API_URL,
      {
        hotelId: hotelId,
        optionId: optionId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: `${API_KEY}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch hotel data");
    }
  } catch (err) {
    console.error("Error fetching hotel data:", err);
    throw new Error("Failed to fetch hotel data");
  }
};
