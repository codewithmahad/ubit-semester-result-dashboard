import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "UBIT Results Portal",
    template: "%s | UBIT Results Portal",
  },
  description:
    "Official academic result portal for BSSE Batch 2025, Department of Computer Science (UBIT), University of Karachi. View grades, GPA, rankings, and download transcripts.",
  keywords: ["UBIT", "results", "BSSE", "University of Karachi", "GPA", "CGPA", "grades"],
  openGraph: {
    title: "UBIT Results Portal",
    description: "BSSE Batch 2025 — Academic Results Dashboard",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-zinc-900 selection:bg-blue-100 selection:text-blue-900`}
      >
        {children}
      </body>
    </html>
  );
}
