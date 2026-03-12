import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Plus_Jakarta_Sans({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GroomShine | Pet Services Marketplace Malaysia",
  description: "Search, compare, and book verified pet grooming, boarding, spa, and clinic services across Malaysia. Your trusted all-in-one pet care platform.",
  openGraph: {
    title: "GroomShine | Pet Services Marketplace Malaysia",
    description: "Search, compare, and book verified pet grooming, boarding, spa, and clinic services across Malaysia.",
    type: "website",
  },
};

import LocalSchema from "@/components/LocalSchema";
import WhatsAppFloat from "@/components/WhatsAppFloat";
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
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  );
}
