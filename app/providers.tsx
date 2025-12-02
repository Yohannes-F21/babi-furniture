// providers.tsx
"use client";

import { Provider, useDispatch } from "react-redux";
import { store, AppDispatch } from "./store/store";
import { useEffect } from "react";
import {
  restoreAuth,
  refreshToken,
  logout,
  setAuthReady,
} from "./store/authSlice";
import { getProducts } from "./store/productSlice"; // ← ADD THIS

function InitializeAuth({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initialize = async () => {
      // Step 1: Restore user from localStorage
      dispatch(restoreAuth());

      // Step 2: Refresh token only when we already have an accessToken
      const { user, isLoggedOut } = store.getState().auth;
      const hasAccessToken = Boolean(user?.accessToken);

      if (hasAccessToken && !isLoggedOut) {
        try {
          await dispatch(refreshToken()).unwrap();
        } catch (error) {
          console.log("Silent refresh failed:", error);
          dispatch(logout());
        }
      } else {
        dispatch(setAuthReady());
      }

      // ←←← THIS IS THE ONLY NEW PART (3 lines) ←←←
      // Fetch products ONCE when the app starts
      try {
        await dispatch(getProducts()).unwrap();
      } catch (err) {
        console.log("Failed to load products on startup:", err);
      }
      // ←←← END OF NEW PART ←←←
    };

    initialize();
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitializeAuth>{children}</InitializeAuth>
    </Provider>
  );
}
