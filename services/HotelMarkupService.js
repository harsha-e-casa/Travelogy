/**
 * Hotel Markup Service
 * 
 * This service handles all hotel markup-related API operations including
 * saving, updating, and fetching markup values for hotel bookings.
 */

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/travelogy/hotel`;

/**
 * Save or update markup for a single hotel booking
 * @param {string} bookingId - The booking ID
 * @param {number} markup - The markup amount to save
 * @returns {Promise<Object>} API response
 */
export const saveHotelMarkup = async (bookingId, markup) => {
    try {
        const response = await fetch(`${API_BASE_URL}/save-markup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookingId: bookingId,
                markup: markup,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to save markup: ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Error saving hotel markup:", error);
        return {
            success: false,
            error: error.message || "Failed to save markup. Please try again.",
        };
    }
};

/**
 * Save or update markup for multiple hotel bookings
 * @param {Array<string>} bookingIds - Array of booking IDs
 * @param {number} markup - The markup amount to save for all bookings
 * @returns {Promise<Object>} API response
 */
export const saveAllHotelMarkup = async (bookingIds, markup) => {
    try {
        const response = await fetch(`${API_BASE_URL}/save-markup-all`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookingIds: bookingIds,
                markup: markup,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to save markup for all bookings: ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Error saving hotel markup for all:", error);
        return {
            success: false,
            error: error.message || "Failed to save markup for all bookings. Please try again.",
        };
    }
};

/**
 * Fetch existing markup for a hotel booking
 * @param {string} bookingId - The booking ID
 * @returns {Promise<Object>} API response with markup value
 */
export const fetchHotelMarkup = async (bookingId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/get-markup?bookingId=${bookingId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch markup: ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Error fetching hotel markup:", error);
        return {
            success: false,
            error: error.message || "Failed to fetch markup.",
            data: { markup: 0 },
        };
    }
};
