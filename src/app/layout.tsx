import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PathnameWrapper from "./pathname-wrapper";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManager } from "@next/third-parties/google";

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
  description: "Software Engineer and UI/UX Designer.",
  openGraph: {
    title: "Dennis Magaki",
    description: "Software Engineer and UI/UX Designer.",
    url: "https://dennis-magaki.is-a.dev",
    siteName: "Dennis Magaki",
    images: [
      {
        url: "/images/preview.png",
        width: 1200,
        height: 630,
        alt: "Dennis Magaki",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dennis Magaki",
    description: "Software Engineer and UI/UX Designer.",
    images: ["/images/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-FSJS9882K7" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased min-h-[100vh]`}
      >
        <Analytics />
        <Navbar />
        <PathnameWrapper>
          {children}
          <Toaster position="bottom-right" />
        </PathnameWrapper>
        <Footer />
        <Analytics />
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
