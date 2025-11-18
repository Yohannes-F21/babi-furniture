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
import api, { initApi } from "@/lib/api";

function InitializeAuth({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initialize = async () => {
      // Step 1: Restore user from localStorage
      dispatch(restoreAuth());

      // Step 2: Get current auth state
      const auth = store.getState().auth;

      // Step 3: Initialize API (always — needed for interceptors)
      initApi(
        () => store.getState().auth,
        async () => {
          const result = await dispatch(refreshToken()).unwrap();
          return result;
        },
        () => dispatch(logout())
      );

      // Step 4: Only try refresh if user exists & not explicitly logged out
      if (auth.user && !auth.isLoggedOut) {
        try {
          await dispatch(refreshToken()).unwrap();
        } catch (error) {
          console.log("Silent refresh failed:", error);
          dispatch(logout());
        }
      } else {
        dispatch(setAuthReady());
      }
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
