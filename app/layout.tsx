import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Ascent",
  description: "Web app for Aggregating AI news and resources",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-gray-900 antialiased mb-4 text-md text-gray-400`}>
        {children}
      </body>
    </html>
  );
}
