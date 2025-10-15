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
  metadataBase: new URL('https://portofolio-rho-rouge.vercel.app'), // Tambahkan ini
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    title: "Portofolio Fathiir - Web Developer",
    description: "Professional portfolio of Muhammad Fathiir Farhansyah",
    url: "https://portofolio-rho-rouge.vercel.app",
    siteName: "Fathiir Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Fathiir Farhansyah Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portofolio Fathiir - Web Developer",
    description: "Professional portfolio of Muhammad Fathiir Farhansyah",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}