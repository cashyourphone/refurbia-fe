import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThemeProviderWrapper from "@/components/themeProviderWrapper";
import { Provider } from 'react-redux';
import { makeStore } from './store';
import StoreProvider from "./storeProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Refurbia",
  description: "Where we turn old phones into cash!",
  keywords: ['refurbised', 'old phone', 'sell old phone', 'refurbia', 'Used Phones for Sale', 'Buy Old Phones', 'Refurbished Phones','Second-Hand Mobile Phones']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Refurbia" />
        <meta property="og:description" content="Where we turn old phones into cash!" />
        <meta property="og:url" content="https://refurbia.in" />
        <link rel="canonical" href="https://refurbia.in" />
      </head>
      <body className={inter.className}>
        <ThemeProviderWrapper>
          <StoreProvider>
            <Header />
            <main className="mt-20">
              {children}
            </main>
          </StoreProvider>
          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
