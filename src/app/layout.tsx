import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PathnameWrapper from "./pathname-wrapper";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import UmamiTracker from "./components/UmamiTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dennis Magaki",
  description: "Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <Navbar />
        <PathnameWrapper>{children}
          <Toaster position="bottom-right" />
        </PathnameWrapper>
        <Footer />
        <UmamiTracker />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="db1dd232-3950-4f3f-9242-20fd47935f78"
          data-auto-track="true"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
