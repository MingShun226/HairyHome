import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hairy Home | Modern Pet Grooming & Boarding",
  description: "Experience premium, non-aggressive pet grooming and cage-free boarding in Taman Maluri, Cheras. Your pet's second home.",
};

import LocalSchema from "@/components/LocalSchema";

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fredoka.variable}>
        <LanguageProvider>
          <LocalSchema />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
