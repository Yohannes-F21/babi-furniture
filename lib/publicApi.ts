// lib/publicApi.ts
import axios from "axios";
// import toast from "react-hot-toast"; // or your toast library
const showSessionMessage = (message: string) => {
  if (typeof window !== "undefined") {
    // Use native alert for now; replace with toast library if available
    window.alert(message);
  } else {
    console.warn("Session message:", message);
  }
};

const publicApi = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// List of PROTECTED routes (add all your admin/dashboard paths)
const PROTECTED_ROUTES = [
  "/dashboard",
  "/admin",
  "/profile",
  "/cart",
  "/orders",
  "/settings",
];

const isProtectedRoute = () => {
  if (typeof window === "undefined") return false;
  return PROTECTED_ROUTES.some((route) =>
    window.location.pathname.startsWith(route)
  );
};

const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  try {
    const user = localStorage.getItem("user");
    if (!user) return null;
    const parsed = JSON.parse(user);
    return parsed?.accessToken ?? null;
  } catch {
    return null;
  }
};

const clearStoredSession = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
};

publicApi.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

publicApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      if (
        error.response?.data?.message.includes("Session expired.") ||
        error.response?.data?.message.includes("Invalid refresh token.")
      ) {
        let toastMessage = "Session expired. Please login again.";
        let shouldLogout = true;

        // Custom messages based on backend response

        // Only show toast & logout if user is on a protected route
        if (isProtectedRoute()) {
          showSessionMessage(toastMessage);

          clearStoredSession();

          // Redirect to login with message
          const redirectTo = `/login?message=${encodeURIComponent(
            toastMessage
          )}`;
          window.location.href = redirectTo;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default publicApi;
