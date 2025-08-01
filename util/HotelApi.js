import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "412605943ad923-4ae7-49f6-9c8e-8b75be573422";

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
          apikey: `${API_KEY}`,
        },
      }
    );

    if (response.data?.status?.success) {
      return response.data;
    } else {
      const apiError =
        response.data?.errors?.[0]?.message ||
        "Unknown error occurred from server";
      throw new Error(apiError);
    }
  } catch (err) {
    const apiMessage =
      err?.response?.data?.errors?.[0]?.message ||
      err?.message ||
      "Unknown error occurred";
    throw new Error(apiMessage);
  }
};
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

// export async function hotelBooking({ formData, hotelReviewData }) {
//   const bookingId = hotelReviewData?.bookingId;
//   const roomInfo = hotelReviewData?.query?.roomInfo || [];
//   const panInfo = formData?.panInfo;
//   const email = formData?.email;
//   const mobile = formData?.mobile;
//   const countryCode = formData?.countryCode || "+91";

//   const totalAmount = hotelReviewData?.hInfo?.ops?.[0]?.tp;
//   const roomTravellerInfo = roomInfo.map((room, roomIndex) => {
//     const guests = [
//       ...(formData.guests?.[roomIndex]
//         ? [
//             formData.guests[roomIndex],
//             ...(formData.guests[roomIndex].extraGuests || []),
//           ]
//         : []),
//     ];

//     const travellers = guests.map((guest, guestIndex) => {
//       const isChild = guest?.type === "children";
//       let pan = "";
//       let pNum = guest?.passportNumber || "";
//       if (!isChild) {
//         if (panInfo?.mode === "same") {
//           pan = panInfo.pan;
//         } else if (panInfo?.mode === "custom") {
//           pan = panInfo.rooms?.[roomIndex]?.useGuardian
//             ? panInfo.rooms?.[roomIndex]?.guardian?.pan
//             : panInfo.rooms?.[roomIndex]?.guests?.[guestIndex]?.pan;
//         }
//       }

//       return {
//         fN: guest?.firstName || "TBA",
//         lN: guest?.lastName || "Guest",
//         ti: guest?.title || "Mr",
//         pt: isChild ? "CHILD" : "ADULT",
//         pNum,
//         ...(isChild ? {} : { pan }),
//       };
//     });

//     return {
//       travellerInfo: travellers,
//     };
//   });

//   const payload = {
//     bookingId,
//     roomTravellerInfo,
//     deliveryInfo: {
//       emails: [email],
//       contacts: [mobile],
//       code: [countryCode],
//     },
//     ssr: roomInfo.map((room, roomIndex) => {
//       const guests = [
//         ...(formData.guests?.[roomIndex]
//           ? [
//               formData.guests[roomIndex],
//               ...(formData.guests[roomIndex].extraGuests || []),
//             ]
//           : []),
//       ];

//       const specialRequests = guests
//         .map((guest) => guest?.specialRequest)
//         .filter(Boolean);

//       const roomSpecialRequest =
//         specialRequests.length > 0
//           ? specialRequests.join(", ")
//           : formData.specialRequest;

//       return {
//         rm: roomSpecialRequest,
//       };
//     }),
//     type: "HOTEL",
//     paymentInfos: [
//       {
//         amount: totalAmount,
//       },
//     ],
//   };

//   console.log("Final Payload to API:", JSON.stringify(payload, null, 2));

//   const response = await axios.post(
//     "https://apitest.tripjack.com/oms/v1/hotel/book",
//     payload,
//     {
//       headers: {
//         apikey: API_KEY,
//       },
//     }
//   );

//   return response.data;
// }
export async function hotelBooking({
  formData,
  hotelReviewData,
  isBlock = false,
}) {
  try {
    const bookingId = hotelReviewData?.bookingId;
    const roomInfo = hotelReviewData?.query?.roomInfo || [];
    const panInfo = formData?.panInfo;
    const email = formData?.email;
    const mobile = formData?.mobile;
    const countryCode = formData?.countryCode || "+91";

    const totalAmount = hotelReviewData?.hInfo?.ops?.[0]?.tp;

    const roomTravellerInfo = roomInfo.map((room, roomIndex) => {
      const guests = [
        ...(formData.guests?.[roomIndex]
          ? [
              formData.guests[roomIndex],
              ...(formData.guests[roomIndex].extraGuests || []),
            ]
          : []),
      ];

      const travellers = guests.map((guest, guestIndex) => {
        const isChild = guest?.type === "children";
        let pan = "";
        let pNum = guest?.passportNumber || "";
        if (!isChild) {
          if (panInfo?.mode === "same") {
            pan = panInfo.pan;
          } else if (panInfo?.mode === "custom") {
            pan = panInfo.rooms?.[roomIndex]?.useGuardian
              ? panInfo.rooms?.[roomIndex]?.guardian?.pan
              : panInfo.rooms?.[roomIndex]?.guests?.[guestIndex]?.pan;
          }
        }

        return {
          fN: guest?.firstName || "TBA",
          lN: guest?.lastName || "Guest",
          ti: guest?.title || "Mr",
          pt: isChild ? "CHILD" : "ADULT",
          pNum,
          ...(isChild ? {} : { pan }),
        };
      });

      return {
        travellerInfo: travellers,
      };
    });

    const payload = {
      bookingId,
      roomTravellerInfo,
      deliveryInfo: {
        emails: [email],
        contacts: [mobile],
        code: [countryCode],
      },
      ssr: roomInfo.map((room, roomIndex) => {
        const guests = [
          ...(formData.guests?.[roomIndex]
            ? [
                formData.guests[roomIndex],
                ...(formData.guests[roomIndex].extraGuests || []),
              ]
            : []),
        ];

        const specialRequests = guests
          .map((guest) => guest?.specialRequest)
          .filter(Boolean);

        const roomSpecialRequest =
          specialRequests.length > 0
            ? specialRequests.join(", ")
            : formData.specialRequest;

        return {
          rm: roomSpecialRequest,
        };
      }),
      type: "HOTEL",
      paymentInfos: isBlock
        ? [] // No payment info for blocking
        : [
            {
              amount: totalAmount, // Include amount for proceeding with booking
            },
          ],
    };

    console.log("Final Payload to API:", JSON.stringify(payload, null, 2));

    const response = await axios.post(
      "https://apitest.tripjack.com/oms/v1/hotel/book",
      payload,
      {
        headers: {
          apikey: API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Booking failed:", error.message);
    throw error; // Handle any errors here
  }
}
export async function getBookingDetails(bookingId) {
  try {
    const response = await fetch(
      "https://apitest.tripjack.com/oms/v1/hotel/booking-details",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: API_KEY,
        },
        body: JSON.stringify({ bookingId }),
      }
    );

    const data = await response.json();

    if (data.status.success) {
      return data;
    } else {
      throw new Error("Failed to fetch booking details");
    }
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw error;
  }
}
