import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Babi Furniture Ethiopia",
  description:
    "Quality furniture with 10+ years of experience, free delivery, and 2-year warranty",
  icons: {
    icon: "/logo4.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-white flex flex-col">
            <Navigation />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
