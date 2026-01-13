import { jwtDecode } from 'jwt-decode'; // ✅ Correct for v4+

export const checkTokenExpiry = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token); // ✅ Now works!

    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return false;
  }
};