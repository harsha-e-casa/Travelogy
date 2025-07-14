import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "412605c3683c38-96bd-45b6-ae06-02e22a8be1b1";

// Fetch hotel review data
export const fetchHotelReviewData = async (hotelId, optionId) => {
  const API_URL_REVIEW = "https://apitest.tripjack.com/hms/v1/hotel-review";

  try {
    const response = await axios.post(
      API_URL_REVIEW,
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

    //     if (response.status === 200) {
    //       return response.data;
    //     } else {
    //       throw new Error("Failed to fetch hotel data");
    //     }
    //   } catch (err) {
    //     console.error("Error fetching hotel data:", err);
    //     throw new Error("Failed to fetch hotel data");
    //   }
    // };
    if (response.data?.status?.success) {
      return response.data;
    } else {
      const apiError =
        response.data?.errors?.[0]?.message ||
        "Unknown error occurred from server";
      throw new Error(apiError);
    }
  } catch (err) {
    // If Axios throws because of HTTP error (e.g. 400)
    const apiMessage =
      err?.response?.data?.errors?.[0]?.message ||
      err?.message ||
      "Unknown error occurred";
    throw new Error(apiMessage);
  }
};
// Hook to fetch cities
export const useCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL_CITY = "https://apitest.tripjack.com/hms/v1/static-cities/";

  useEffect(() => {
    axios
      .get(API_URL_CITY, {
        headers: {
          apikey: API_KEY,
        },
      })
      .then((res) => {
        const cityList = res.data.response?.cil || [];
        setCities(cityList);
      })
      .catch((err) => {
        console.error("Error fetching cities:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { cities, loading };
};

// Hook to fetch nationalities
export const useNationalities = () => {
  const [nationalities, setNationalities] = useState([]);
  const [loading, setLoading] = useState(true);
  const NATIONALITY_API =
    "https://apitest.tripjack.com/hms/v1/nationality-info";

  useEffect(() => {
    axios
      .get(NATIONALITY_API, {
        headers: {
          apikey: API_KEY,
        },
      })
      .then((res) => {
        const data = res.data.nationalityInfos || [];
        setNationalities(data);
      })
      .catch((err) => {
        console.error("Error fetching nationalities:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { nationalities, loading };
};
