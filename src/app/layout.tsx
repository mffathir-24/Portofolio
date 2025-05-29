import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portofolio Fathiir",
  authors: [
    {
      name: "Muhammad Fathiir Farhansyah",
      url: "https://portofolio-rho-rouge.vercel.app/",
    },
  ],
  keywords: ["portfolio", "web development", "next.js"],
  creator: "Muhammad Fathiir Farhansyah",
  description: "Professional portfolio of Muhammad Fathiir Farhansyah",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    images: '/og-image.png', // Image untuk social media sharing
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
