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
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/uok-logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "UBIT Results Portal — Academic Dashboard",
    description: "Instant access to BSSE Batch 2025 grades, cumulative GPA, class rankings, and printable transcripts. Built by students, for students.",
    type: "website",
    url: "https://ubit-results.vercel.app",
    siteName: "UBIT Results Portal",
    locale: "en_US",
    images: [
      {
        url: "/ubit-logo.jpg",
        width: 200,
        height: 200,
        alt: "UBIT Results Portal",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "UBIT Results Portal",
    description: "BSSE Batch 2025 — View grades, GPA, class rankings and download transcripts.",
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
