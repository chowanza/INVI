import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INVI | Crowdfunding Inmobiliario",
  description: "Plataforma amigable de inversión colectiva para el sector inmobiliario en Venezuela.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth scroll-pt-16">
      <body id="inicio" className={`${inter.className} min-h-screen bg-background antialiased flex flex-col`}>
        <Navbar />
        <main className="flex-1 flex flex-col w-full items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
