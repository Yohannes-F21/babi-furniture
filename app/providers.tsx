"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "./store/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initializeAuth } from "./store/authSlice"

function InitializeAuth({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitializeAuth>{children}</InitializeAuth>
    </Provider>
  )
}
