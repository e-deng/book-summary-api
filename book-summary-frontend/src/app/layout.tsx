import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Summary API - GPT Researcher",
  description: "Generate comprehensive book summaries using GPT Researcher deep research",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
