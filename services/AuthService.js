import Cookies from "js-cookie";

export const performLogout = async () => {
    try {
        // 1. Clear all Local Storage items
        localStorage.clear();

        // 2. Clear all Cookies
        const allCookies = Cookies.get();
        if (allCookies) {
            Object.keys(allCookies).forEach((cookieName) => {
                Cookies.remove(cookieName);
                Cookies.remove(cookieName, { path: "/" }); // Ensure root path cookies are removed
                Cookies.remove(cookieName, { domain: window.location.hostname }); // Try removing with domain
            });
        }

        // 3. Optional: Call Server Logout Endpoint
        // Use a try-catch for the network request so it doesn't block the redirect
        try {
            await fetch("/api/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
        } catch (networkError) {
            console.warn("Logout API call failed, continuing with client cleanup:", networkError);
        }

    } catch (error) {
        console.error("Error during logout cleanup:", error);
    } finally {
        // 4. Redirect to login page
        window.location.href = "/login";
    }
};
