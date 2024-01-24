import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Options Hub",
  description: "Discover the basics of puts and calls.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
