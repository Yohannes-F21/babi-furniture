// lib/publicApi.ts  ← NEW: For public users (no redirect!)
import axios from "axios";

const publicApi = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // still send cookies if exist
});

// NO RESPONSE INTERCEPTOR → no redirect on 401!
publicApi.interceptors.request.use((config) => {
  return config;
});

export default publicApi;
