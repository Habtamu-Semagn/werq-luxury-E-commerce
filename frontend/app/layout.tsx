import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SideCart from "@/components/sections/SideCart";

const inter = Inter({
  variable: "--font-standard",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-luxury",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WERQ | Luxury Minimalist E-Commerce",
  description: "High-fashion, luxury minimalist e-commerce platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <SideCart />
      </body>
    </html>
  );
}

