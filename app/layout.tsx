import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"

export const metadata: Metadata = {
  title: "Alpha Furniture Ethiopia - Premium Furniture Store",
  description: "Quality furniture with 19+ years of experience, free delivery, and 2-year warranty",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white flex flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
