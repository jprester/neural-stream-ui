import type { Metadata } from "next";

import GoogleAnalytics from "@/lib/GoogleAnalytics";

import "./globals.css";

export const metadata: Metadata = {
  title: "Neural Stream",
  description: "Web app for Aggregating AI news and resources",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-900 antialiased mb-4 text-md text-gray-400 dark`}
      >
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        {children}
      </body>
    </html>
  );
}
