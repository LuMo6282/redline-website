import type { Metadata } from "next";
import { Share_Tech_Mono, Syne, Inter_Tight } from "next/font/google";
import "./globals.css";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Redline — AI Training Advisor",
  description:
    "Real-time readiness scoring, adaptive programming, and AI coaching built for hybrid athletes. Join the waitlist.",
  openGraph: {
    title: "Redline — AI Training Advisor",
    description:
      "Where discipline meets direction. AI-powered training for hybrid athletes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${shareTechMono.variable} ${syne.variable} ${interTight.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
