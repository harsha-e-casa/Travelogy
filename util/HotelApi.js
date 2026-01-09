import { useState, useEffect } from "react";
import axios from "axios";
import { getData, postData } from "@/services/NetworkAdapter";

// const API_KEY = "412605943ad923-4ae7-49f6-9c8e-8b75be573422";

// export const fetchHotelReviewData = async (hotelId, optionId) => {
//   const API_URL_REVIEW = "https://apitest.tripjack.com/hms/v1/hotel-review";

//   try {
//     const response = await axios.post(
//       API_URL_REVIEW,
//       {
//         hotelId: hotelId,
//         optionId: optionId,
//       },
//       {
//         headers: {
//           apikey: `${API_KEY}`,
//         },
//       }
//     );

//     if (response.data?.status?.success) {
//       return response.data;
//     } else {
//       const apiError = response.data?.errors?.[0]?.message;
//       throw new Error(apiError);
//     }
//   } catch (err) {
//     const apiMessage =
//       err?.response?.data?.errors?.[0]?.message || err?.message;
//     throw new Error(apiMessage);
//   }
// };

// export const useCities = () => {
//   const [cities, setCities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const API_URL_CITY = "https://apitest.tripjack.com/hms/v1/static-cities/";

//   useEffect(() => {
//     axios
//       .get(API_URL_CITY, {
//         headers: {
//           apikey: API_KEY,
//         },
//       })
//       .then((res) => {
//         const cityList = res.data.response?.cil || [];
//         setCities(cityList);
//       })
//       .catch((err) => {
//         console.error("Error fetching cities:", err);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return { cities, loading };
// };

export const useNationalities = () => {
  const [nationalities, setNationalities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        setLoading(true);

        const res = await getData("travelogy/hotel/get-data", {
          action: "nationality",
        });

        const data = res?.nationalityInfos || [];
        setNationalities(data);

        console.log("Fetched nationalities:", data);
      } catch (err) {
        console.error("Error fetching nationalities:", err);
        setNationalities([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchNationalities();
  }, []);

  return { nationalities, loading };
};

// export const useNationalities = () => {
//   const [nationalities, setNationalities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const NATIONALITY_API =
//     "https://apitest.tripjack.com/hms/v1/nationality-info";

//   useEffect(() => {
//     // const res = await getData("travelogy/hotel/get-data", {
//     //   action: "nationality"
//     // });
//     // console.log("ffffffgggggggggggg ",res)

//     axios
//       .get(NATIONALITY_API, {
//         headers: {
//           apikey: API_KEY,
//         },
//       })
//       .then((res) => {
//         const data = res.data.nationalityInfos || [];
//         setNationalities(data);
//       })
//       .catch((err) => {
//         console.error("Error fetching nationalities:", err);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return { nationalities, loading };
// };

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
function buildRoomTravellerInfo({ formData, roomInfo, panInfo }) {
  const isSame = panInfo?.mode === "same";
  const samePAN = (panInfo?.pan || "").toUpperCase().trim();

  return (roomInfo || []).map((room, roomIndex) => {
    const lead = formData?.guests?.[roomIndex] || null;
    const extras = lead?.extraGuests || [];
    const guests = lead ? [lead, ...extras] : [];

    // Calculate required number of guests based on room configuration
    const requiredAdults = room?.numberOfAdults || 0;
    const requiredChildren = room?.numberOfChild || 0;
    const totalRequired = requiredAdults + requiredChildren;

    // Fill missing guests with TBA placeholders
    while (guests.length < totalRequired) {
      const missingAdults = guests.filter(g => g?.type !== "children").length;
      const isChildSlot = missingAdults >= requiredAdults;
      
      guests.push({
        title: isChildSlot ? "Master" : "Mr",
        firstName: "TBA",
        lastName: "TBA",
        type: isChildSlot ? "children" : "adults",
        passportNumber: "",
      });
    }

    const roomEntry = (panInfo?.rooms || [])[roomIndex];
    const useGuardian = roomEntry?.useGuardian;
    const guardianPAN = (roomEntry?.guardian?.pan || "").toUpperCase().trim();

    return {
      travellerInfo: guests.map((guest, gIdx) => {
        const isChild = (guest?.type || "").toLowerCase() === "children";
        const base = {
          fN: guest?.firstName || "TBA",
          lN: guest?.lastName || "TBA",
          ti: guest?.title || "Mr",
          pt: isChild ? "CHILD" : "ADULT",
          pNum: guest?.passportNumber || "",
        };
        if (isChild) return base;

        let pan = "";
        if (isSame) pan = samePAN;
        else if (useGuardian) pan = guardianPAN;
        else pan = (roomEntry?.guests?.[gIdx]?.pan || "").toUpperCase().trim();

        return pan ? { ...base, pan } : base;
      }),
    };
  });
}
export async function hotelBooking({
  formData,
  hotelReviewData,
  updatedFormData,
  isBlock = false,
}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  console.log("tokentoken 1111111 => ",token)
  try {
    const roomInfo = hotelReviewData?.query?.roomInfo || [];
    const totalAmount = hotelReviewData?.hInfo?.ops?.[0]?.tp;

    // ✅ Resolve panInfo from either place
    const panInfo = (updatedFormData?.panInfo ?? formData?.panInfo) || {};

    const roomTravellerInfo = buildRoomTravellerInfo({
      formData,
      roomInfo,
      panInfo,
    });

    const payload = {
      bookingId: hotelReviewData?.bookingId,
      type: "HOTEL",
      roomTravellerInfo,
      deliveryInfo: {
        emails: formData?.email ? [formData.email] : [],
        contacts: formData?.mobile ? [formData.mobile] : [],
        code: [formData?.countryCode || "+91"],
      },
      ...(panInfo?.tcsDeclaration
        ? { metadata: { tcsDeclaration: panInfo.tcsDeclaration } }
        : {}),
      ...(isBlock
        ? {}
        : { paymentInfos: totalAmount ? [{ amount: totalAmount }] : [] }),
    };

    console.log("PAN MODE:", panInfo.mode);
    console.log("PAYLOAD:", JSON.stringify(payload, null, 2));

    const res = await postData("travelogy/hotel/fetch-data", {
      action: "book",
      requestData: payload,
    });

    // save hotel bookings
    const updateHotelBookingData = async () => {
      let saveReq = {
        type: "save",
        booking_id: hotelReviewData?.bookingId,
        status: "",
        amount: hotelReviewData?.hInfo?.ops?.[0]?.tp || 0,
      };

      const res = await postData("travelogy/hotel/save-booking-data", saveReq, {
        Authorization: `Bearer ${token}`,
      });
      console.log("res == ", res);
    };

    if (res?.status?.success === true) {
      await updateHotelBookingData();
    }

    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
export async function getBookingDetails(bookingId, setError) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  try {
    // const response = await fetch(
    //   "https://apitest.tripjack.com/oms/v1/hotel/booking-details",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       apikey: API_KEY,
    //     },
    //     body: JSON.stringify({ bookingId }),
    //   }
    // );

    // const data = await response.json();

    let reqData = {
      action: "bookDetails",
      requestData: { bookingId },
    };
    const response = await postData("travelogy/hotel/fetch-data", reqData, { Authorization: `Bearer ${token}` });

    if (response?.message) {
      setError(response.message);
    } else if (response.errors && response.errors.length > 0) {
      console.log("Error Message ", response.errors[0].message);
      setError(response.errors.message); // Set error from response.errors
    } else if (response.error) {
      console.log("Error Message new", response.error);
      setError(response.error[0].message); // Set error from response.error field
    }
    //  console.log("Error Message ", response.errors?.[0].message);
    // console.log("Error Message new", response.error);

    const data = response;

    // save booking data
    const updateHotelBookingData = async () => {
      let saveReq = {
        type: "update",
        booking_id: bookingId,
        status: data?.order?.status,
        booking_time: new Date().toISOString(),
      };

      const res = await postData("travelogy/hotel/save-booking-data", saveReq,{
        Authorization: `Bearer ${token}`,
      });
      console.log("res == ", res);
    };
    await updateHotelBookingData();

    if (data?.status?.success) {
      return data;
    } else {
      throw new Error(response.errors?.[0]?.message || response.error);
    }
  } catch (error) {
    console.error("Error fetching booking details:", error);
    if (error?.response?.data?.message) {
      setError(error.response.data.message);
    } else if (setError && typeof setError === 'function') {
      setError(error.message);
    }
    throw error;
  }
}
