"use client"

import { X, CheckCircle, AlertCircle } from "lucide-react"
import { useEffect } from "react"

interface ToastProps {
  type: "success" | "error"
  message: string
  onClose: () => void
}

export default function Toast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === "success" ? "bg-green-50" : "bg-red-50"
  const borderColor = type === "success" ? "border-green-200" : "border-red-200"
  const Icon = type === "success" ? CheckCircle : AlertCircle

  return (
    <div
      className={`fixed top-20 right-4 max-w-sm p-4 rounded-lg border ${bgColor} ${borderColor} shadow-lg flex items-start gap-3 z-50`}
    >
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${type === "success" ? "text-green-600" : "text-red-600"}`} />
      <div className="flex-1">
        <p className={`text-sm font-medium ${type === "success" ? "text-green-800" : "text-red-800"}`}>{message}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
