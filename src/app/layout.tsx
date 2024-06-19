import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalState from "@/context/global-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FasionWare",
  description: "FashionWare is a e-Commerce full stack web app in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main className="flex min-h-screen flex-col mt-[79px]">
            {children}
          </main>
          <Footer />
        </GlobalState>
      </body>
    </html>
  );
}
