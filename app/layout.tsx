import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Cool 3D Portfolio",
  description: "A creative portfolio built with Next.js & R3F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden">{children}</body>
    </html>
  );
}